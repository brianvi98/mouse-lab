package com.brianvi98.mouselab.gear;

import com.brianvi98.mouselab.common.envelope.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/gear")
public class GearController {

    private final GearService gearService;

    @GetMapping
    public ResponseEntity<ApiResponse<GearResponse>> getGear() {
        return ResponseEntity.ok(ApiResponse.success(gearService.getGear()));
    }
}
