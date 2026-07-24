package com.brianvi98.mouselab.session.types;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum RefreshRate {

    HZ_60(60),
    HZ_75(75),
    HZ_100(100),
    HZ_120(120),
    HZ_144(144),
    HZ_165(165),
    HZ_180(180),
    HZ_240(240),
    HZ_360(360),
    HZ_480(480),
    HZ_540(540);

    private final int value;

    @JsonValue
    public int getValue() {
        return value;
    }

    @JsonCreator
    public static RefreshRate fromValue(int value) {

        for (RefreshRate refreshRate : values()) {
            if (refreshRate.value == value) {
                return refreshRate;
            }
        }
        throw new IllegalArgumentException("Invalid refresh rate value: " + value);
    }
}
