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

    public boolean complete() {
        if (completed) {
            return false;
        }

        completed = true;
        return true;
    }
    public void updateDetails(
            String title,
            String description,
            QuestCategory category,
            QuestDifficulty difficulty
    ) {
        this.title = title;
        this.description = description;
        this.category = category;

        // Only active quests can change difficulty and XP
        if (!this.completed) {
            this.difficulty = difficulty;

            this.xpReward = switch (difficulty) {
                case EASY -> 10;
                case MEDIUM -> 25;
                case HARD -> 50;
            };
        }
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
