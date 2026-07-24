package com.brianvi98.mouselab.session.dto.response;

import java.time.Instant;
import java.util.List;
import java.util.UUID;


public record SessionDetailResponse(
        UUID id,
        Instant createdAt,
        List<TrialDetailsResponse> trials
) {}
