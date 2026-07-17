package com.brianvi98.mouselab.session.domain;

import java.util.ArrayList;
import java.util.List;

public final class MetricsCalculator {

    private MetricsCalculator() {
    }

    private enum Axis {
        X,
        Y
    }

    private record TimedValue(double value, double time) {
    }

    public static CalculatedMetrics calculate(List<PointerSample> samples) {

        List<TimedValue> velocitiesX = calculateVelocity(samples, Axis.X);
        List<TimedValue> velocitiesY = calculateVelocity(samples, Axis.Y);
        List<TimedValue> accelerationsX = calculateAcceleration(velocitiesX);
        List<TimedValue> accelerationsY = calculateAcceleration(velocitiesY);
        List<TimedValue> velocityMagnitude = calculateVelocityMagnitude(samples);
        List<TimedValue> accelerationMagnitude = calculateAcceleration(velocityMagnitude);

        List<CalculatedMetrics.FrameSample> frameSamples = new ArrayList<>();

        for (int i = 0; i < velocitiesX.size(); i++) {
            frameSamples.add(new CalculatedMetrics.FrameSample(
                    velocitiesX.get(i).time(),
                    velocitiesX.get(i).value(),
                    velocitiesY.get(i).value(),
                    i > 0 ? accelerationsX.get(i - 1).value() : 0,
                    i > 0 ? accelerationsY.get(i - 1).value() : 0,
                    velocityMagnitude.get(i).value(),
                    i > 0 ? accelerationMagnitude.get(i - 1).value() : 0
            ));
        }
        return new CalculatedMetrics(
                frameSamples,
                average(velocitiesX),
                average(velocitiesY),
                average(accelerationsX),
                average(accelerationsY),
                max(velocityMagnitude),
                max(accelerationMagnitude)
        );
    }

    private static List<TimedValue> calculateVelocity(
            List<PointerSample> samples,
            Axis axis
    ) {

        List<TimedValue> result = new ArrayList<>();

        if (samples.size() < 2) {
            return result;
        }

        for (int i = 1; i < samples.size(); i++) {
            PointerSample previous = samples.get(i - 1);
            PointerSample current = samples.get(i);
            double deltaTime = current.t() - previous.t();
            double deltaPosition = axis == Axis.X ? current.dx() : current.dy();
            double velocity = deltaTime > 0 ? Math.abs(deltaPosition / deltaTime) : 0;

            result.add(new TimedValue(
                    velocity,
                    current.t()
            ));
        }

        return result;
    }

    private static List<TimedValue> calculateVelocityMagnitude(List<PointerSample> samples) {

        List<TimedValue> vx = calculateVelocity(samples, Axis.X);
        List<TimedValue> vy = calculateVelocity(samples, Axis.Y);
        List<TimedValue> result = new ArrayList<>();

        for (int i = 0; i < vx.size(); i++) {
            result.add(new TimedValue(
                    Math.sqrt(
                            Math.pow(vx.get(i).value(), 2)
                                    +
                                    Math.pow(vy.get(i).value(), 2)
                    ),
                    vx.get(i).time()
            ));
        }

        return result;
    }

    private static List<TimedValue> calculateAcceleration(List<TimedValue> velocityData) {

        List<TimedValue> result =
                new ArrayList<>();

        if (velocityData.size() < 2) {
            return result;
        }

        for (int i = 1; i < velocityData.size(); i++) {
            TimedValue previous = velocityData.get(i - 1);
            TimedValue current = velocityData.get(i);
            double deltaTime = current.time() - previous.time();
            double deltaVelocity = current.value() - previous.value();
            double acceleration = deltaTime > 0 ? Math.abs(deltaVelocity / deltaTime) : 0;

            result.add(new TimedValue(
                    acceleration,
                    current.time()
            ));
        }

        return result;
    }

    private static double average(List<TimedValue> values) {

        if (values.isEmpty()) {
            return 0;
        }

        return values.stream()
                .mapToDouble(TimedValue::value)
                .average()
                .orElse(0);
    }

    private static double max(List<TimedValue> values) {

        return values.stream()
                .mapToDouble(TimedValue::value)
                .max()
                .orElse(0);
    }
}
