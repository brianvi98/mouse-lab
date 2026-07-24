package com.brianvi98.mouselab.session.domain;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class MetricsCalculatorTest {

    private static final double DELTA = 0.0001;

    @Test
    void calculate_returnsEmptyFrames_whenFewerThanTwoSamples() {
        List<PointerSample> samples = List.of(new PointerSample(0, 0, 0, 0, 0));

        CalculatedMetrics metrics = MetricsCalculator.calculate(samples);

        assertTrue(metrics.frameSamples().isEmpty());
        assertEquals(0.0, metrics.peakVelocity());
        assertEquals(0.0, metrics.peakAcceleration());
    }

    @Test
    void calculate_computesCorrectVelocity_forTwoSamples() {
        List<PointerSample> samples = List.of(
                new PointerSample(100, 100, 0, 0, 0),
                new PointerSample(105, 102, 5, 2, 16)
        );

        CalculatedMetrics metrics = MetricsCalculator.calculate(samples);
        CalculatedMetrics.FrameSample frame = metrics.frameSamples().getFirst();

        assertEquals(1, metrics.frameSamples().size());
        assertEquals(16.0, frame.t(), DELTA);
        assertEquals(0.3125, frame.vx(), DELTA);
        assertEquals(0.125, frame.vy(), DELTA);
        // first frame has no prior velocity to diff against
        assertEquals(0.0, frame.ax(), DELTA);
        assertEquals(0.0, frame.ay(), DELTA);
    }

    @Test
    void calculate_velocityIsAlwaysNonNegative_evenWithNegativeMovement() {
        List<PointerSample> samples = List.of(
                new PointerSample(100, 100, 0, 0, 0),
                new PointerSample(95, 98, -5, -2, 16)
        );

        CalculatedMetrics metrics = MetricsCalculator.calculate(samples);

        assertEquals(0.3125, metrics.frameSamples().getFirst().vx(), DELTA);
    }

    @Test
    void calculate_returnsZeroVelocity_whenDeltaTimeIsZero() {
        List<PointerSample> samples = List.of(
                new PointerSample(100, 100, 0, 0, 0),
                new PointerSample(105, 102, 5, 2, 0) // same timestamp
        );

        CalculatedMetrics metrics = MetricsCalculator.calculate(samples);

        assertEquals(0.0, metrics.frameSamples().getFirst().vx(), DELTA);
    }

    @Test
    void calculate_computesAccelerationFromSecondFrameOnward() {
        List<PointerSample> samples = List.of(
                new PointerSample(0, 0, 0, 0, 0),
                new PointerSample(5, 2, 5, 2, 16),
                new PointerSample(12, 5, 7, 3, 32)
        );

        CalculatedMetrics metrics = MetricsCalculator.calculate(samples);

        assertEquals(2, metrics.frameSamples().size());
        assertEquals(0.0, metrics.frameSamples().getFirst().ax(), DELTA); // no prior velocity
        assertNotEquals(0.0, metrics.frameSamples().get(1).ax());     // now has a delta to compute
    }

    @Test
    void calculate_velocityMagnitude_isPythagoreanCombination() {
        List<PointerSample> samples = List.of(
                new PointerSample(100, 100, 0, 0, 0),
                new PointerSample(105, 102, 5, 2, 16)
        );

        CalculatedMetrics metrics = MetricsCalculator.calculate(samples);
        CalculatedMetrics.FrameSample frame = metrics.frameSamples().getFirst();

        double expected = Math.sqrt(Math.pow(0.3125, 2) + Math.pow(0.125, 2));
        assertEquals(expected, frame.v(), DELTA);
    }

    @Test
    void calculate_peakVelocity_equalsMaxVelocityMagnitudeAcrossFrames() {
        List<PointerSample> samples = List.of(
                new PointerSample(0, 0, 0, 0, 0),
                new PointerSample(5, 2, 5, 2, 16),
                new PointerSample(20, 10, 15, 8, 32)
        );

        CalculatedMetrics metrics = MetricsCalculator.calculate(samples);

        double expectedPeak = metrics.frameSamples().stream()
                .mapToDouble(CalculatedMetrics.FrameSample::v)
                .max()
                .orElseThrow();

        assertEquals(expectedPeak, metrics.peakVelocity(), DELTA);
    }

    @Test
    void calculate_averageVelocityX_isAverageOfAbsoluteValues() {
        List<PointerSample> samples = List.of(
                new PointerSample(0, 0, 0, 0, 0),
                new PointerSample(5, 0, 5, 0, 16),
                new PointerSample(0, 0, -5, 0, 32) // negative movement, should still average as positive
        );

        CalculatedMetrics metrics = MetricsCalculator.calculate(samples);

        assertEquals(5.0 / 16, metrics.avgVelocitiesX(), DELTA);
    }
}