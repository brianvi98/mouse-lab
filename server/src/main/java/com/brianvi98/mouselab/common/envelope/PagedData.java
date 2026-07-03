package com.brianvi98.mouselab.common.envelope;

import java.util.List;

public record PagedData<T>(List<T> items, PagedInfo metadata) {}
