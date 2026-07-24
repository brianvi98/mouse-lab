package com.brianvi98.mouselab.gear.mousepad;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface MousepadRepository extends JpaRepository<Mousepad, UUID> {
}
