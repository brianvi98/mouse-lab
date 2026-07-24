package com.brianvi98.mouselab.session.repository;

import com.brianvi98.mouselab.session.model.Session;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SessionRepository extends JpaRepository<Session, UUID> {

    Page<Session> findAllByUserIdOrderByCreatedAtDesc(UUID userId, Pageable pageable);

    long countByUserId(UUID userId);

    @Query("SELECT s.sessionSettings.mouse.id " +
            "FROM Session s " +
            "WHERE s.user.id = :userId " +
            "GROUP BY s.sessionSettings.mouse.id " +
            "ORDER BY COUNT(s) " +
            "DESC " +
            "LIMIT 1")
    List<UUID> findMostUsedMouseId(UUID userId);

    @Query("SELECT s.sessionSettings.mousepad.id " +
            "FROM Session s " +
            "WHERE s.user.id = :userId " +
            "GROUP BY s.sessionSettings.mousepad.id " +
            "ORDER BY COUNT(s) " +
            "DESC " +
            "LIMIT 1")
    List<UUID> findMostUsedMousepadId(UUID userId);

    @Query("SELECT s.sessionSettings.skates.id " +
            "FROM Session s " +
            "WHERE s.user.id = :userId " +
            "GROUP BY s.sessionSettings.skates.id " +
            "ORDER BY COUNT(s) " +
            "DESC " +
            "LIMIT 1")
    List<UUID> findMostUsedSkatesId(UUID userId);
}
