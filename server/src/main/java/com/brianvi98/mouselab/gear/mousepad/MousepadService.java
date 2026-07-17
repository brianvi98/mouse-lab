package com.brianvi98.mouselab.gear.mousepad;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MousepadService {

    private final MousepadRepository mousepadRepository;

    public List<MousepadResponse> getAll() {
        return mousepadRepository.findAll()
                .stream()
                .map(MousepadResponse::from)
                .toList();
    }
}
