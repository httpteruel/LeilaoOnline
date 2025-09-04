package com.leilaoonline.leilao.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leilaoonline.leilao.model.Feedback;
import com.leilaoonline.leilao.repository.FeedbackRepository;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    public Feedback salvarFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public List<Feedback> listarTodos() {
        return feedbackRepository.findAll();
    }

    public Optional<Feedback> buscarPorId(Long id) {
        return feedbackRepository.findById(id);
    }
}