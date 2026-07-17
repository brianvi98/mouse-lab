package com.brianvi98.mouselab.gear.mouse;

import java.util.UUID;

public record MouseResponse(UUID id, String brand, String model, String fullName) {

    public static MouseResponse from(Mouse mouse) {

        return new MouseResponse(
                mouse.getId(),
                mouse.getBrand(),
                mouse.getModel(),
                mouse.getFullName()
        );
    }
}
