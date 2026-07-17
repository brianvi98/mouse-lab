package com.brianvi98.mouselab.gear.mousepad;

import java.util.UUID;

public record MousepadResponse(UUID id, String brand, String model, String fullName) {

    public static MousepadResponse from(Mousepad mousepad) {

        return new MousepadResponse(
                mousepad.getId(),
                mousepad.getBrand(),
                mousepad.getModel(),
                mousepad.getFullName()
        );
    }
}
