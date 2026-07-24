package com.brianvi98.mouselab.session.controller;

import com.brianvi98.mouselab.gear.mouse.Mouse;
import com.brianvi98.mouselab.gear.mouse.MouseRepository;
import com.brianvi98.mouselab.gear.mousepad.Mousepad;
import com.brianvi98.mouselab.gear.mousepad.MousepadRepository;
import com.brianvi98.mouselab.gear.skates.Skates;
import com.brianvi98.mouselab.gear.skates.SkatesRepository;
import com.brianvi98.mouselab.session.domain.PointerSample;
import com.brianvi98.mouselab.session.model.Session;
import com.brianvi98.mouselab.session.model.SessionSettings;
import com.brianvi98.mouselab.session.model.Trial;
import com.brianvi98.mouselab.session.repository.SessionRepository;
import com.brianvi98.mouselab.session.types.PollingRate;
import com.brianvi98.mouselab.session.types.RefreshRate;
import com.brianvi98.mouselab.session.types.ScreenResolution;
import com.brianvi98.mouselab.session.types.TrialType;
import com.brianvi98.mouselab.user.User;
import com.brianvi98.mouselab.user.UserRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class SessionControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    SessionRepository sessionRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    MouseRepository mouseRepository;

    @Autowired
    MousepadRepository mousepadRepository;

    @Autowired
    SkatesRepository skatesRepository;

    private final String clerkUserId = "user_test_123";

    @Test
    void getSession_returnsMetricsForOwnedSession() throws Exception {

        Session session = createMockSession();

        mockMvc.perform(
                        get("/sessions/{id}", session.getId())
                                .with(jwt()
                                        .jwt(jwt -> jwt
                                                .subject(clerkUserId)
                                        )
                                )
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id")
                        .value(session.getId().toString()))
                .andExpect(jsonPath("$.data.trials.length()")
                        .value(1))
                .andExpect(jsonPath("$.data.trials[0].trialType")
                        .value("tracking"))
                .andExpect(jsonPath("$.data.trials[0].metrics")
                        .exists())
                .andExpect(jsonPath("$.data.trials[0].metrics.frameSamples.length()")
                        .value(1));
    }

    @Test
    void getSession_returns403_whenNotOwnedByRequester() throws Exception {

        Session session = createMockSession();

        mockMvc.perform(
                        get("/sessions/{id}", session.getId())
                                .with(jwt().jwt(jwt -> jwt.subject("a-completely-different-clerk-id")))
                )
                .andExpect(status().isForbidden());
    }

    @Test
    void getSession_returns401_whenNoTokenProvided() throws Exception {
        mockMvc.perform(get("/sessions/{id}", UUID.randomUUID()))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void getSession_returns404_whenSessionDoesNotExist() throws Exception {
        mockMvc.perform(
                        get("/sessions/{id}", UUID.randomUUID())
                                .with(jwt().jwt(jwt -> jwt.subject("any-user")))
                )
                .andExpect(status().isNotFound());
    }

    private Session createMockSession() {

        User user = new User();
        user.setClerkUserId(clerkUserId);

        user = userRepository.save(user);

        Mouse mouse = Mouse.builder()
                .brand("Ultra mice")
                .model("Very light")
                .build();

        Mousepad mousepad = Mousepad.builder()
                .brand("Super pad")
                .model("Very fast")
                .build();

        Skates skates = Skates.builder()
                .brand("Mega skates")
                .model("Very smooth")
                .build();

        mouseRepository.save(mouse);
        mousepadRepository.save(mousepad);
        skatesRepository.save(skates);

        SessionSettings settings = SessionSettings.builder()
                .pollingRateHz(PollingRate.HZ_1000)
                .dpi(800)
                .windowsSensitivity(6)
                .screenResolution(ScreenResolution.RES_1920_1080)
                .refreshRateHz(RefreshRate.HZ_144)
                .mouse(mouse)
                .mousepad(mousepad)
                .skates(skates)
                .build();

        Session session = Session.builder()
                .user(user)
                .sessionSettings(settings)
                .trials(new ArrayList<>())
                .build();

        Trial trial = Trial.builder()
                .trialType(TrialType.TRACKING)
                .pointerSamples(List.of(
                        new PointerSample(
                                100,
                                100,
                                0,
                                0,
                                0
                        ),
                        new PointerSample(
                                105,
                                102,
                                5,
                                2,
                                16
                        )
                ))
                .build();

        session.addTrial(trial);

        return sessionRepository.save(session);
    }
}