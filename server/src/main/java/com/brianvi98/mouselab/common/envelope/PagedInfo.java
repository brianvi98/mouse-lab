package com.brianvi98.mouselab.common.envelope;

import org.springframework.data.domain.Page;

public record PagedInfo(
        int page,
        int pageSize,
        long totalElements,
        int totalPages,
        boolean hasNext,
        boolean hasPrevious
) {
    public static PagedInfo from(Page<?> page) {
        return new PagedInfo(
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.hasNext(),
                page.hasPrevious()
        );
    }
}
