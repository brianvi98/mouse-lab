package com.brianvi98.mouselab.session.dto.request;

import com.brianvi98.mouselab.session.types.PollingRate;
import com.brianvi98.mouselab.session.types.RefreshRate;
import com.brianvi98.mouselab.session.types.ScreenResolution;

import java.util.UUID;

public record SessionSettingsRequest(
        UUID mouseId,
        UUID mousepadId,
        UUID skatesId,
        PollingRate pollingRateHz,
        int dpi,
        int windowsSensitivity,
        ScreenResolution screenResolution,
        RefreshRate refreshRateHz
) {
}
