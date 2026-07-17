package com.brianvi98.mouselab.common.envelope;

import org.springframework.data.domain.Page;

import java.util.List;

public record PagedData<T>(List<T> items, PagedInfo paging) {

    public static <T> PagedData<T> from(Page<T> page) {
        return new PagedData<>(page.getContent(), PagedInfo.from(page));
    }
}
