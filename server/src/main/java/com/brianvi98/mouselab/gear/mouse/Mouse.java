package com.brianvi98.mouselab.gear.mouse;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "mouse", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"brand", "model"})
})
public class Mouse {

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
