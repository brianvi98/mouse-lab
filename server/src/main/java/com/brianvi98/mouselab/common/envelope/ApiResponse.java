package com.brianvi98.mouselab.common.envelope;

import jakarta.servlet.http.HttpServletRequest;
import lombok.Getter;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.time.Instant;

@Getter
public class ApiResponse<T> {

    private final T data;
    private final String error;
    private final Instant timestamp;
    private final String path;

    private ApiResponse(T data, String error, Instant timestamp, String path) {
        this.data = data;
        this.error = error;
        this.timestamp = timestamp;
        this.path = path;
    }

    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(data, null, Instant.now(), currentPath());
    }

    public static <T> ApiResponse<T> error(String errorMessage) {
        return new ApiResponse<>(null, errorMessage, Instant.now(), currentPath());
    }

    private static String currentPath() {
        ServletRequestAttributes attrs =
                (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        if (attrs == null) return null;

        HttpServletRequest request = attrs.getRequest();
        return request.getRequestURI();
    }
}
