package com.leilaoonline.leilao.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leilaoonline.leilao.model.Feedback;
import com.leilaoonline.leilao.service.FeedbackService;

@RestController
@RequestMapping("/api/feedbacks")
@CrossOrigin(origins = "http://localhost:3000")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<Feedback> criarFeedback(@RequestBody Feedback feedback) {
        Feedback novoFeedback = feedbackService.salvarFeedback(feedback);
        return new ResponseEntity<>(novoFeedback, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Feedback>> listarFeedbacks() {
        List<Feedback> feedbacks = feedbackService.listarTodos();
        return new ResponseEntity<>(feedbacks, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Feedback> buscarFeedbackPorId(@PathVariable Long id) {
        Optional<Feedback> feedback = feedbackService.buscarPorId(id);
        if (feedback.isPresent()) {
            return new ResponseEntity<>(feedback.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}