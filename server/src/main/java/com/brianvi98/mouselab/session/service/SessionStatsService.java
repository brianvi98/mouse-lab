package com.brianvi98.mouselab.session.service;

import com.brianvi98.mouselab.gear.mouse.MouseRepository;
import com.brianvi98.mouselab.gear.mousepad.MousepadRepository;
import com.brianvi98.mouselab.gear.skates.SkatesRepository;
import com.brianvi98.mouselab.session.dto.response.SessionsStatsResponse;
import com.brianvi98.mouselab.session.repository.SessionRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SessionStatsService {

    private final MouseRepository mouseRepository;
    private final MousepadRepository mousepadRepository;
    private final SkatesRepository skatesRepository;
    private final SessionRepository sessionRepository;

    public SessionsStatsResponse getUserSessionsStats(UUID userId) {

        List<UUID> mouseResult = sessionRepository.findMostUsedMouseId(userId);
        String mostUsedMouseFullName = mouseResult.isEmpty()
                ? null
                : mouseRepository.findById(mouseResult.getFirst())
                    .orElseThrow(() -> new EntityNotFoundException("Mouse not found"))
                    .getFullName();

        List<UUID> mousepadResult = sessionRepository.findMostUsedMousepadId(userId);
        String mostUsedMousepadFullName = mousepadResult.isEmpty()
                ? null
                : mousepadRepository.findById(mousepadResult.getFirst())
                    .orElseThrow(() -> new EntityNotFoundException("Mousepad not found"))
                    .getFullName();

        List<UUID> skatesResult = sessionRepository.findMostUsedSkatesId(userId);
        String mostUsedSkatesId = skatesResult.isEmpty()
                ? null
                : skatesRepository.findById(skatesResult.getFirst())
                    .orElseThrow(() -> new EntityNotFoundException("Skates not found"))
                    .getFullName();

        long totalSessions = sessionRepository.countByUserId(userId);

        return new SessionsStatsResponse(
                mostUsedMouseFullName,
                mostUsedMousepadFullName,
                mostUsedSkatesId,
                totalSessions
        );
    }

}
