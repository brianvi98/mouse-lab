package com.brianvi98.mouselab.session.dto.response;

import com.brianvi98.mouselab.session.model.Session;
import com.brianvi98.mouselab.session.model.SessionSettings;
import com.brianvi98.mouselab.session.model.Trial;
import com.brianvi98.mouselab.session.types.TrialType;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record SessionSummaryResponse(
        UUID id,
        Instant createdAt,
        String mouse,
        String mousepad,
        String skates,
        List<TrialType> trialTypes
) {

    public static SessionSummaryResponse from(Session session) {

        SessionSettings settings = session.getSessionSettings();
        List<TrialType> trialTypes = session.getTrials().stream()
                .map(Trial::getTrialType)
                .toList();

        return new SessionSummaryResponse(
                session.getId(),
                session.getCreatedAt(),
                settings.getMouse().getFullName(),
                settings.getMousepad().getFullName(),
                settings.getSkates().getFullName(),
                trialTypes
        );
    }
}
