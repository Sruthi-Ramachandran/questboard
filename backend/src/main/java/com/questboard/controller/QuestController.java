package com.questboard.controller;

import com.questboard.model.*;
import com.questboard.service.QuestService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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

    public record CreateQuestRequest(
            @NotBlank @Size(max = 100) String title,
            @Size(max = 500) String description,
            QuestCategory category,
            QuestDifficulty difficulty
    ) {}
}
