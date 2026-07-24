package com.brianvi98.mouselab.gear.skates;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SkatesRepository extends JpaRepository<Skates, UUID>{
}
