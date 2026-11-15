package com.questboard.controller;

import com.questboard.model.*;
import com.questboard.service.QuestService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import java.util.NoSuchElementException;
import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/quests")
@CrossOrigin(origins = "http://localhost:5173")
public class QuestController {
    private final QuestService service;

    public QuestController(QuestService service) {
        this.service = service;
    }

    @GetMapping
    public List<Quest> getQuests() {
        return service.findAll();
    }

    @PostMapping
    public Quest createQuest(@Valid @RequestBody CreateQuestRequest request) {
        return service.create(request.title(), request.description(),
                request.category(), request.difficulty());
    }
    @PatchMapping("/{id}/complete")
    public Quest completeQuest(@PathVariable Long id) {
        try {
            return service.complete(id);
        } catch (NoSuchElementException ex) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, ex.getMessage());
        }
    }

    public record CreateQuestRequest(
            @NotBlank @Size(max = 100) String title,
            @Size(max = 500) String description,
            QuestCategory category,
            QuestDifficulty difficulty
    ) {}

    @GetMapping("/xp")
    public int getTotalXp() {
        return service.getTotalXp();
    }

    @PutMapping("/{id}")
    public Quest updateQuest(
            @PathVariable Long id,
            @Valid @RequestBody CreateQuestRequest request
    ) {
        try {
            return service.update(
                    id,
                    request.title(),
                    request.description(),
                    request.category(),
                    request.difficulty()
            );
        } catch (NoSuchElementException ex) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, ex.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteQuest(@PathVariable Long id) {
        try {
            service.delete(id);
        } catch (NoSuchElementException ex) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, ex.getMessage());
        }
    }

}
