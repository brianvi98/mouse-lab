package com.brianvi98.mouselab.common.envelope;

import jakarta.servlet.http.HttpServletRequest;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.time.LocalDateTime;

@Getter
@Setter
public class ApiResponse<T> {

    private int status;
    private T data;
    private String error;
    private LocalDateTime timestamp;
    private String path;

    private ApiResponse(int status, T data, String error, LocalDateTime timestamp, String path) {
        this.status = status;
        this.data = data;
        this.error = error;
        this.timestamp = timestamp;
        this.path = path;
    }

    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(200, data, null, LocalDateTime.now(), currentPath());
    }

    public static <T> ApiResponse<T> error(String errorMessage, int status) {
        return new ApiResponse<>(status, null, errorMessage, LocalDateTime.now(), currentPath());
    }

    public static String currentPath() {
        ServletRequestAttributes attrs =
                (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        if (attrs == null) return null;

        HttpServletRequest request = attrs.getRequest();
        return request.getRequestURI();
    }
}
