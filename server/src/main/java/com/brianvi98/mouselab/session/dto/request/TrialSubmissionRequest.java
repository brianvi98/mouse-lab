package com.brianvi98.mouselab.session.dto.request;

import com.brianvi98.mouselab.session.domain.PointerSample;
import com.brianvi98.mouselab.session.types.TrialType;

import java.util.List;

public record TrialSubmissionRequest(
    TrialType trialType,
    List<PointerSample> pointerSamples
) {
}
