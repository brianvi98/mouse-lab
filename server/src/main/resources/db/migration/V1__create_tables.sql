-- User
CREATE TABLE users (
    id UUID PRIMARY KEY,
    clerk_user_id VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Mouse
CREATE TABLE mouse
(
    id UUID NOT NULL PRIMARY KEY,
    brand VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    UNIQUE (brand, model)
);

-- Mousepad
CREATE TABLE mousepad
(
    id UUID NOT NULL PRIMARY KEY,
    brand VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    UNIQUE (brand, model)
);

-- Skates
CREATE TABLE skates
(
    id UUID NOT NULL PRIMARY KEY,
    brand VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    UNIQUE (brand, model)
);

-- Session
CREATE TABLE session
(
    id UUID NOT NULL PRIMARY KEY,
    polling_rate VARCHAR(255) NOT NULL,
    dpi INTEGER NOT NULL,
    windows_sensitivity INTEGER NOT NULL,
    screen_resolution VARCHAR(255),
    refresh_rate VARCHAR(255),
    user_id UUID NOT NULL, -- FK to User
    mouse_id UUID NOT NULL, -- FK to Mouse
    mousepad_id UUID NOT NULL, -- FK to Mousepad
    skates_id UUID NOT NULL, -- FK to Skates
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,

    CONSTRAINT fk_session_user
        FOREIGN KEY (user_id)
        REFERENCES users(id),

    CONSTRAINT fk_session_mouse
        FOREIGN KEY (mouse_id)
        REFERENCES mouse(id),

    CONSTRAINT fk_session_mousepad
        FOREIGN KEY (mousepad_id)
        REFERENCES mousepad(id),

    CONSTRAINT fk_session_skates
        FOREIGN KEY (skates_id)
        REFERENCES skates(id)
);

CREATE INDEX idx_session_user_id_created
    ON session(user_id, created_at DESC);

-- Trial
CREATE TABLE trial
(
    id UUID NOT NULL PRIMARY KEY,
    trial_type VARCHAR(255) NOT NULL,
    pointer_samples JSONB NOT NULL,
    session_id UUID NOT NULL, -- FK to Session

    CONSTRAINT fk_trial_session
        FOREIGN KEY (session_id)
            REFERENCES session(id)
);

CREATE INDEX idx_trial_session_id
    ON trial(session_id);



