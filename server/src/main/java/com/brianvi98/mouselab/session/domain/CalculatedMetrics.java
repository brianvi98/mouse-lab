package com.brianvi98.mouselab.session.domain;

import java.util.List;

public record CalculatedMetrics(
        List<FrameSample> frameSamples,
        double avgVelocitiesX,
        double avgVelocitiesY,
        double avgAccelerationsX,
        double avgAccelerationsY,
        double peakVelocity,
        double peakAcceleration
) {

    public record FrameSample(
            double t,
            double vx,
            double vy,
            double ax,
            double ay,
            double v,
            double a
    ) {
    }
}
