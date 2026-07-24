package com.brianvi98.mouselab.session.service;

import com.brianvi98.mouselab.gear.mouse.Mouse;
import com.brianvi98.mouselab.gear.mouse.MouseRepository;
import com.brianvi98.mouselab.gear.mousepad.Mousepad;
import com.brianvi98.mouselab.gear.mousepad.MousepadRepository;
import com.brianvi98.mouselab.gear.skates.Skates;
import com.brianvi98.mouselab.gear.skates.SkatesRepository;
import com.brianvi98.mouselab.session.domain.MetricsCalculator;
import com.brianvi98.mouselab.session.dto.request.SessionSettingsRequest;
import com.brianvi98.mouselab.session.dto.request.SessionSubmissionRequest;
import com.brianvi98.mouselab.session.dto.request.TrialSubmissionRequest;
import com.brianvi98.mouselab.session.dto.response.SessionDetailResponse;
import com.brianvi98.mouselab.session.dto.response.TrialDetailsResponse;
import com.brianvi98.mouselab.session.model.Session;
import com.brianvi98.mouselab.session.model.SessionSettings;
import com.brianvi98.mouselab.session.model.Trial;
import com.brianvi98.mouselab.session.repository.SessionRepository;
import com.brianvi98.mouselab.user.User;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SessionService {

    private final MouseRepository mouseRepository;
    private final MousepadRepository mousepadRepository;
    private final SkatesRepository skatesRepository;
    private final SessionRepository sessionRepository;

    public Page<Session> getSessionsByUser(UUID userId, Pageable pageable) {

        return sessionRepository.findAllByUserIdOrderByCreatedAtDesc(userId, pageable);
    }

    public SessionDetailResponse getSessionById(UUID sessionId, UUID requestingUserId) {

        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new EntityNotFoundException("No session found with id: " + sessionId));

        if (!session.getUser().getId().equals(requestingUserId)) {
            throw new AccessDeniedException("This session doesn't belong to you");
        }

        List<TrialDetailsResponse> trials =
                session.getTrials()
                        .stream()
                        .map(trial ->
                                new TrialDetailsResponse(
                                        trial.getId(),
                                        trial.getTrialType(),
                                        MetricsCalculator.calculate(
                                                trial.getPointerSamples()
                                        )
                                )
                        )
                        .toList();

        return new SessionDetailResponse(
                session.getId(),
                session.getCreatedAt(),
                trials
        );
    }

    @Transactional
    public Session createSession(User user, SessionSubmissionRequest submissionRequest) {

        SessionSettingsRequest settingsRequest = submissionRequest.settings();
        List<TrialSubmissionRequest> trialsRequest = submissionRequest.trials();

        // verify that the peripherals exist
        Mouse mouse = mouseRepository.findById(settingsRequest.mouseId())
                .orElseThrow(() -> new EntityNotFoundException("Mouse not found"));

        Mousepad mousepad = mousepadRepository.findById(settingsRequest.mousepadId())
                .orElseThrow(() -> new EntityNotFoundException("Mousepad not found"));

        Skates skates = skatesRepository.findById(settingsRequest.skatesId())
                .orElseThrow(() -> new EntityNotFoundException("Skates not found"));

        SessionSettings settings = SessionSettings.builder()
                .pollingRateHz(settingsRequest.pollingRateHz())
                .dpi(settingsRequest.dpi())
                .windowsSensitivity(settingsRequest.windowsSensitivity())
                .screenResolution(settingsRequest.screenResolution())
                .refreshRateHz(settingsRequest.refreshRateHz())
                .mouse(mouse)
                .mousepad(mousepad)
                .skates(skates)
                .build();

        Session session = Session.builder()
                .user(user)
                .sessionSettings(settings)
                .trials(new ArrayList<>())
                .build();

        trialsRequest.forEach(t -> {
            Trial trial = Trial.builder()
                    .trialType(t.trialType())
                    .pointerSamples(t.pointerSamples())
                    .build();
            session.addTrial(trial);
        });

        return sessionRepository.save(session);
    }

    @Transactional
    public void deleteSession(User user, UUID sessionId) {

        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new EntityNotFoundException("No session found with id: " + sessionId));

        if (!session.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("This session doesn't belong to you");
        }

        sessionRepository.delete(session);
    }
}
