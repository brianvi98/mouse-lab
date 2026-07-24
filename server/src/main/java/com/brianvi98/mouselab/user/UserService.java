package com.brianvi98.mouselab.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User getOrCreateUser(String clerkUserId) {
        return userRepository.findUserByClerkUserId(clerkUserId)
                .orElseGet(() -> createUserWithClerkId(clerkUserId));
    }

    public UUID getUserIdByClerkUserId(String clerkUserId) {
        return getOrCreateUser(clerkUserId).getId();
    }

    private User createUserWithClerkId(String clerkUserId) {
        User newUser = new User();
        newUser.setClerkUserId(clerkUserId);
        return userRepository.save(newUser);
    }
}
