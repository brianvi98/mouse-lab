package com.brianvi98.mouselab.gear.mouse;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MouseService {

    private final MouseRepository mouseRepository;

    public List<MouseResponse> getAll() {
        return mouseRepository.findAll()
                .stream()
                .sorted(Comparator.comparing(Mouse::getFullName))
                .map(MouseResponse::from)
                .toList();
    }
}
