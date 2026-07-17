package com.brianvi98.mouselab.gear;

import com.brianvi98.mouselab.gear.mouse.MouseResponse;
import com.brianvi98.mouselab.gear.mousepad.MousepadResponse;
import com.brianvi98.mouselab.gear.skates.SkatesResponse;

import java.util.List;

public record GearResponse(
        List<MouseResponse> mice,
        List<MousepadResponse> mousepads,
        List<SkatesResponse> skates
) {}
