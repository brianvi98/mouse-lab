package com.brianvi98.mouselab.session.types;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum ScreenResolution {

    RES_1920_1080("1920x1080"),
    RES_2560_1440("2560x1440"),
    RES_3840_2160("3840x2160"),
    RES_2560_1080("2560x1080"),
    RES_3440_1440("3440x1440"),
    RES_3840_1600("3840x1600");

    private final String value;

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public static ScreenResolution fromResolution(String resolution) throws IllegalArgumentException {

        for (ScreenResolution screenResolution: values()) {
            if (screenResolution.getValue().equals(resolution)) {
                return screenResolution;
            }
        }
        throw new IllegalArgumentException("Invalid resolution: " + resolution);
    }
}
