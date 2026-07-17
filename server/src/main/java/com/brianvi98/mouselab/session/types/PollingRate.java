package com.brianvi98.mouselab.session.types;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum PollingRate {

    HZ_125(125),
    HZ_250(250),
    HZ_500(500),
    HZ_1000(1000),
    HZ_2000(2000),
    HZ_4000(4000),
    HZ_8000(8000);

    private final int value;

    @JsonValue
    public int getValue() {
        return value;
    }

    @JsonCreator
    public static PollingRate fromValue(int value) throws IllegalArgumentException {
        for (PollingRate r : PollingRate.values()) {
            if (r.getValue() == value) return r;
        }
        throw new IllegalArgumentException("Invalid polling rate value: " + value);
    }
}
