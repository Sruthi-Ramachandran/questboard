package com.questboard.service;

import com.questboard.model.*;
import com.questboard.repository.QuestRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;
import java.util.NoSuchElementException;

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

    @Transactional
    public Quest complete(Long id) {
        Quest quest = repository.findById(id)
                .orElseThrow(() ->
                        new NoSuchElementException("Quest not found: " + id));

        quest.complete();

        return repository.save(quest);
    }

    public int getTotalXp() {
        return repository.findAll()
                .stream()
                .filter(Quest::isCompleted)
                .mapToInt(Quest::getXpReward)
                .sum();
    }
    @Transactional
    public Quest update(
            Long id,
            String title,
            String description,
            QuestCategory category,
            QuestDifficulty difficulty
    ) {
        Quest quest = repository.findById(id)
                .orElseThrow(() ->
                        new NoSuchElementException("Quest not found: " + id));

        quest.updateDetails(title, description, category, difficulty);

        return repository.save(quest);
    }

    @Transactional
    public void delete(Long id) {
        Quest quest = repository.findById(id)
                .orElseThrow(() ->
                        new NoSuchElementException("Quest not found: " + id));

        repository.delete(quest);
    }

}
