package com.brianvi98.mouselab.session.repository;

import com.brianvi98.mouselab.session.model.Session;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SessionRepository extends JpaRepository<Session, UUID> {

    Page<Session> findAllByUserIdOrderByCreatedAtDesc(UUID userId, Pageable pageable);
}
