package com.brianvi98.mouselab.session.dto.response;

import com.brianvi98.mouselab.session.domain.CalculatedMetrics;
import com.brianvi98.mouselab.session.types.TrialType;

import java.util.UUID;

public record TrialDetailsResponse(
        UUID id,
        TrialType trialType,
        CalculatedMetrics metrics
) {
}
