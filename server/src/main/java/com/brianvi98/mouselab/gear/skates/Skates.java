package com.brianvi98.mouselab.gear.skates;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "skates", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"brand", "model"})
})
public class Skates {

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
