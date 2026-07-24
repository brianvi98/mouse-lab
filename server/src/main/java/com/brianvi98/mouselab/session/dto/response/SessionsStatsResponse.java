package com.brianvi98.mouselab.session.dto.response;

public record SessionsStatsResponse(
        String mostUsedMouseFullName,
        String mostUsedMousepadFullName,
        String mostUsedSkatesFullName,
        long totalSessionsCompleted
) {}
