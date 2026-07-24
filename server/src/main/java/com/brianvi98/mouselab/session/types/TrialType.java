package com.brianvi98.mouselab.session.types;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum TrialType {

    TRACKING("tracking"),
    FLICKING("flicking");

    private final String value;

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public TrialType fromValue(String trial) throws IllegalArgumentException {

        for (TrialType t: values()) {
            if (t.value.equals(trial)) return t;
        }
        throw new IllegalArgumentException("Trial type " + trial + " not found");
    }
}
