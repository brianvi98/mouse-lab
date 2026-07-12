package com.brianvi98.mouselab.session.types;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum TrialType {

    TRACKING("tracking"),
    FLICKING("flicking");

    private final String value;

    public TrialType fromValue(String trial) throws IllegalArgumentException {

        for (TrialType t: values()) {
            if (t.value.equals(trial)) return t;
        }
        throw new IllegalArgumentException("Trial type " + trial + " not found");
    }
}
