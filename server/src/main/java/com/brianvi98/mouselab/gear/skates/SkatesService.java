package com.brianvi98.mouselab.gear.skates;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SkatesService {

    private final SkatesRepository skatesRepository;

    public List<SkatesResponse> getAll() {
        return skatesRepository.findAll()
                .stream()
                .sorted(Comparator.comparing(Skates::getFullName))
                .map(SkatesResponse::from)
                .toList();
    }
}
