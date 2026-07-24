package com.brianvi98.mouselab.session.dto.request;

import java.util.List;

public record SessionSubmissionRequest(
        SessionSettingsRequest settings,
        List<TrialSubmissionRequest> trials
) {
}
