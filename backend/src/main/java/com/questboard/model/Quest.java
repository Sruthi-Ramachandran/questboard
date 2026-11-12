package com.questboard.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "quests")
public class Quest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(length = 500)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuestCategory category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuestDifficulty difficulty;

    @Column(nullable = false)
    private int xpReward;

    @Column(nullable = false)
    private boolean completed = false;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    protected Quest() {}

    public Quest(String title, String description, QuestCategory category,
                 QuestDifficulty difficulty, int xpReward) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.difficulty = difficulty;
        this.xpReward = xpReward;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public QuestCategory getCategory() { return category; }
    public QuestDifficulty getDifficulty() { return difficulty; }
    public int getXpReward() { return xpReward; }
    public boolean isCompleted() { return completed; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
