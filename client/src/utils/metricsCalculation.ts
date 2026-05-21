import type { PointerDataPoint } from "@/hooks/usePointerCapture";

export type Axis = "x" | "y";

export type Metric = "vx" | "vy" | "ax" | "ay" | "v" | "a";

export type VelocityInfo = {
  velocity: number;
  time: number;
};

export type AccelerationInfo = {
  acceleration: number;
  time: number;
};

export type Frame = {
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  v: number;
  a: number;
  t: number;
};

export type calculatedMetrics = {
  frames: Frame[];
  avgVelocitiesX: number;
  avgVelocitiesY: number;
  avgAccelerationsX: number;
  avgAccelerationsY: number;
  peakVelocity: number;
  peakAcceleration: number;
};

// pointer data point shape: {x, y, dx, dy, t}
export const calculateVelocity: (
  data: PointerDataPoint[],
  axis: Axis,
) => VelocityInfo[] = (data, axis) => {
  if (data.length < 2) return [];

  return data.slice(1).map((pt, i) => {
    const prev = data[i];
    const deltaTime = pt.t - prev.t;
    const deltaPosition = axis === "x" ? pt.dx : pt.dy;
    const velocity = deltaTime > 0 ? Math.abs(deltaPosition / deltaTime) : 0;

    return { velocity, time: pt.t };
  });
};

// for flicking (direction agnostic)
export const calculateVelocityMagnitude: (
  data: PointerDataPoint[],
) => VelocityInfo[] = (data) => {
  if (data.length < 2) return [];

  const velocitiesX: VelocityInfo[] = calculateVelocity(data, "x");
  const velocitiesY: VelocityInfo[] = calculateVelocity(data, "y");

  return velocitiesX.map((vx, i) => ({
    velocity: Math.sqrt(
      vx.velocity ** 2 + (velocitiesY[i]?.velocity ?? 0) ** 2,
    ),
    time: vx.time,
  }));
};

export const calculateAcceleration: (
  velocityData: VelocityInfo[],
) => AccelerationInfo[] = (data) => {
  if (data.length < 2) return [];

  return data.slice(1).map((vi, i) => {
    const prev = data[i];
    const deltaTime = vi.time - prev.time;
    const deltaVelocity = vi.velocity - prev.velocity;
    const acceleration =
      deltaTime > 0 ? Math.abs(deltaVelocity / deltaTime) : 0;

    return { acceleration, time: vi.time };
  });
};

// again, for flicking (direction agnostic)
export const calculateAccelerationMagnitude: (
  data: PointerDataPoint[],
) => AccelerationInfo[] = (data) => {
  const velocitiesMagnitude = calculateVelocityMagnitude(data);
  return calculateAcceleration(velocitiesMagnitude);
};

const average = (arr: number[]) => {
  return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
};

export const calculateMetrics = (
  data: PointerDataPoint[],
): calculatedMetrics => {
  const velocitiesX = calculateVelocity(data, "x");
  const velocitiesY = calculateVelocity(data, "y");
  const accelerationsX = calculateAcceleration(velocitiesX);
  const accelerationsY = calculateAcceleration(velocitiesY);
  const velocitiesMagnitude = calculateVelocityMagnitude(data);
  const accelerationsMagnitude = calculateAccelerationMagnitude(data);

  const frames: Frame[] = [];

  for (let i = 0; i < velocitiesX.length; i++) {
    frames.push({
      t: velocitiesX[i].time,
      vx: velocitiesX[i]?.velocity ?? 0,
      vy: velocitiesY[i]?.velocity ?? 0,
      ax: accelerationsX[i - 1]?.acceleration ?? 0,
      ay: accelerationsY[i - 1]?.acceleration ?? 0,
      v: velocitiesMagnitude[i]?.velocity ?? 0,
      a: accelerationsMagnitude[i - 1]?.acceleration ?? 0,
    });
  }

  const avgVelocitiesX = average(velocitiesX.map((v) => Math.abs(v.velocity)));
  const avgVelocitiesY = average(velocitiesY.map((v) => Math.abs(v.velocity)));
  const avgAccelerationsX = average(
    accelerationsX.map((a) => Math.abs(a.acceleration)),
  );
  const avgAccelerationsY = average(
    accelerationsY.map((a) => Math.abs(a.acceleration)),
  );
  const peakVelocity = velocitiesMagnitude.length
    ? Math.max(...velocitiesMagnitude.map((v) => v.velocity))
    : 0;
  const peakAcceleration = accelerationsMagnitude.length
    ? Math.max(...accelerationsMagnitude.map((a) => a.acceleration))
    : 0;

  return {
    frames,
    avgVelocitiesX,
    avgVelocitiesY,
    avgAccelerationsX,
    avgAccelerationsY,
    peakVelocity,
    peakAcceleration,
  };
};
