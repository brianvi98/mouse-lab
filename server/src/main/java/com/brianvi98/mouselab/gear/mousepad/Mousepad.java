package com.brianvi98.mouselab.gear.mousepad;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "mousepad", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"brand", "model"})
})
public class Mousepad {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private String model;

    public String getFullName() {
        return brand + " " + model;
    }
}
