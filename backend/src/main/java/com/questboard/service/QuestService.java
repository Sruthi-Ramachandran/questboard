package com.questboard.service;

import com.questboard.model.*;
import com.questboard.repository.QuestRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class QuestService {
    private final QuestRepository repository;

    public QuestService(QuestRepository repository) {
        this.repository = repository;
    }

    public List<Quest> findAll() {
        return repository.findAll();
    }

    public Quest create(String title, String description,
                        QuestCategory category, QuestDifficulty difficulty) {
        int xp = switch (difficulty) {
            case EASY -> 10;
            case MEDIUM -> 25;
            case HARD -> 50;
        };
        return repository.save(new Quest(title, description, category, difficulty, xp));
    }
}
