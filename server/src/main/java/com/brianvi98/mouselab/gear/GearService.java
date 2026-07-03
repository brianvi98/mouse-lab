package com.brianvi98.mouselab.gear;

import com.brianvi98.mouselab.gear.mouse.MouseResponse;
import com.brianvi98.mouselab.gear.mouse.MouseService;
import com.brianvi98.mouselab.gear.mousepad.MousepadResponse;
import com.brianvi98.mouselab.gear.mousepad.MousepadService;
import com.brianvi98.mouselab.gear.skates.SkatesResponse;
import com.brianvi98.mouselab.gear.skates.SkatesService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GearService {

    private final MouseService mouseService;
    private final MousepadService mousepadService;
    private final SkatesService skatesService;

    public GearResponse getGear() {
        List<MouseResponse> allMice = mouseService.getAll();
        List<MousepadResponse> allMousepads = mousepadService.getAll();
        List<SkatesResponse> allSkates = skatesService.getAll();

        return new GearResponse(
                allMice,
                allMousepads,
                allSkates
        );
    }
}
