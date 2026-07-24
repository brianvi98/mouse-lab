package com.brianvi98.mouselab.gear.mousepad;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MousepadService {

    private final MousepadRepository mousepadRepository;

    public List<MousepadResponse> getAll() {
        return mousepadRepository.findAll()
                .stream()
                .sorted(Comparator.comparing(Mousepad::getFullName))
                .map(MousepadResponse::from)
                .toList();
    }
}
