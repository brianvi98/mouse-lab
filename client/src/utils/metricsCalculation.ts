import type { PointerDataPoint } from "@/hooks/usePointerCapture";

export type Axis = 'x' | 'y';
export type VelocityInfo = {
    velocity: number;
    time: number;
}
export type AccelerationInfo = {
    acceleration: number;
    time: number;
}

// pointer data point shape: {x, y, dx, dy, t}
export const calculateVelocity: (
    data: PointerDataPoint[],
    axis: Axis,
) => VelocityInfo[] = (data, axis) => {
    if (data.length < 2) return [];

    return data.slice(1).map((pt, i) => {
        const prev = data[i];
        const deltaTime = pt.t - prev.t;
        const deltaPosition = (axis === 'x') ? pt.dx : pt.dy;
        const velocity = deltaTime > 0 ? deltaPosition / deltaTime : 0;

        return {velocity, time: pt.t};
    })
}

export const calculateAcceleration: (
    velocityData: VelocityInfo[]
) => AccelerationInfo[] = (data) => {
    if (data.length < 2) return [];

    return data.slice(1).map((vi, i) => {
        const prev = data[i];
        const deltaTime = vi.time - prev.time;
        const acceleration = deltaTime > 0 ? vi.velocity / deltaTime : 0;

        return {acceleration, time: vi.time};
    })
}

type calculatedMetrics = {
    velocitiesX: VelocityInfo[],
    velocitiesY: VelocityInfo[],
    accelerationsX: AccelerationInfo[],
    accelerationsY: AccelerationInfo[],
}

export const calculateMetrics = (
    data: PointerDataPoint[]
): calculatedMetrics => {
    const velocitiesX = calculateVelocity(data, 'x');
    const velocitiesY = calculateVelocity(data, 'y');
    const accelerationsX = calculateAcceleration(velocitiesX);
    const accelerationsY = calculateAcceleration(velocitiesY);

    return {
        velocitiesX,
        velocitiesY,
        accelerationsX,
        accelerationsY,
    }
}