package com.brianvi98.mouselab.session.controller;

import com.brianvi98.mouselab.common.envelope.ApiResponse;
import com.brianvi98.mouselab.common.envelope.PagedData;
import com.brianvi98.mouselab.session.dto.request.SessionSubmissionRequest;
import com.brianvi98.mouselab.session.dto.response.SessionDetailResponse;
import com.brianvi98.mouselab.session.dto.response.SessionSummaryResponse;
import com.brianvi98.mouselab.session.model.Session;
import com.brianvi98.mouselab.session.service.SessionService;
import com.brianvi98.mouselab.user.User;
import com.brianvi98.mouselab.user.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.oauth2.jwt.Jwt;

import java.net.URI;
import java.util.UUID;

@RestController
@RequestMapping("/sessions")
@RequiredArgsConstructor
public class SessionController {

    private final UserService userService;
    private final SessionService sessionService;

    @GetMapping
    public ApiResponse<PagedData<SessionSummaryResponse>> getSessionsByUser(
            @AuthenticationPrincipal Jwt jwt,
            @PageableDefault Pageable pageable) {

        UUID userId = userService.getUserIdByClerkUserId(jwt.getSubject());
        Page<SessionSummaryResponse> sessionsByUser = sessionService
                .getSessionsByUser(userId, pageable)
                .map(SessionSummaryResponse::from);

        return ApiResponse.success(PagedData.from(sessionsByUser));
    }

    @GetMapping("/{id}")
    public ApiResponse<SessionDetailResponse> getSessionById(
            @PathVariable UUID id,
            @AuthenticationPrincipal Jwt jwt) {

        UUID userId = userService.getUserIdByClerkUserId(jwt.getSubject());
        SessionDetailResponse sessionDetails = sessionService.getSessionById(id, userId);

        return ApiResponse.success(sessionDetails);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<SessionSummaryResponse>> createSession(
            @AuthenticationPrincipal Jwt jwt,
            @RequestBody @Valid SessionSubmissionRequest request
    ) {

        User user = userService.getOrCreateUser(jwt.getSubject());
        Session session = sessionService.createSession(user, request);
        URI path = URI.create("/sessions/" + session.getId());

        return ResponseEntity.created(path)
                .body(ApiResponse.success(SessionSummaryResponse.from(session)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSession(
            @PathVariable UUID id,
            @AuthenticationPrincipal Jwt jwt
    ) {

        User user = userService.getOrCreateUser(jwt.getSubject());
        sessionService.deleteSession(user, id);

        return ResponseEntity.noContent().build();
    }
}
