package com.brianvi98.mouselab.session.model;

import com.brianvi98.mouselab.session.domain.PointerSample;
import com.brianvi98.mouselab.session.types.TrialType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "trial", indexes = {
        @Index(name = "idx_trial_session_id", columnList = "session_id")
})
public class Trial {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Enumerated(EnumType.STRING)
    @Column(name = "trial_type", nullable = false)
    private TrialType trialType;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "pointer_samples", columnDefinition = "jsonb", nullable = false)
    private List<PointerSample> pointerSamples;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id", nullable = false)
    private Session session;
}
