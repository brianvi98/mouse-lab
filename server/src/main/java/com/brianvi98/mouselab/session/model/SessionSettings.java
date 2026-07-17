package com.brianvi98.mouselab.session.model;

import com.brianvi98.mouselab.session.types.PollingRate;
import com.brianvi98.mouselab.session.types.RefreshRate;
import com.brianvi98.mouselab.session.types.ScreenResolution;
import com.brianvi98.mouselab.gear.mouse.Mouse;
import com.brianvi98.mouselab.gear.mousepad.Mousepad;
import com.brianvi98.mouselab.gear.skates.Skates;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SessionSettings {

    @Enumerated(EnumType.STRING)
    @Column(name ="polling_rate", nullable = false)
    private PollingRate pollingRateHz;

    @Column(nullable = false)
    private int dpi;

    @Min(1) @Max(20)
    @Column(name="windows_sensitivity", nullable = false)
    private int windowsSensitivity;

    @Enumerated(EnumType.STRING)
    @Column(name = "screen_resolution")
    private ScreenResolution screenResolution;

    @Enumerated(EnumType.STRING)
    @Column(name = "refresh_rate")
    private RefreshRate refreshRateHz;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mouse_id", nullable = false)
    private Mouse mouse;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mousepad_id", nullable = false)
    private Mousepad mousepad;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "skates_id", nullable = false)
    private Skates skates;
}
