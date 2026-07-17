package com.brianvi98.mouselab.session.domain;

// raw, recorded pointer data
public record PointerSample(double x, double y, double dx, double dy, double t) {}
