package com.brianvi98.mouselab.gear.skates;

import java.util.UUID;

public record SkatesResponse(UUID id, String brand, String model, String fullName) {

    public static SkatesResponse from(Skates skates) {

        return new SkatesResponse(
                skates.getId(),
                skates.getBrand(),
                skates.getModel(),
                skates.getFullName()
        );
    }
}
