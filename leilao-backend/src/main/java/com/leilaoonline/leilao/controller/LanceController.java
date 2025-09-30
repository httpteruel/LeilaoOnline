package com.leilaoonline.leilao.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leilaoonline.leilao.dto.LanceCadastroDTO; // Importa o DTO
import com.leilaoonline.leilao.model.Lance;
import com.leilaoonline.leilao.service.LanceService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/lances")
@CrossOrigin(origins = "http://localhost:3000")
public class LanceController {

    @Autowired
    private LanceService lanceService;

    @PostMapping
    // CORREÇÃO: Recebe apenas o DTO no corpo (@RequestBody)
    public ResponseEntity<Lance> darLance(@RequestBody @Valid LanceCadastroDTO dto) {
        try {
            // Chama o método atualizado do Service
            Lance novoLance = lanceService.darLance(dto);
            return new ResponseEntity<>(novoLance, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            // Retorna a mensagem de erro do Service (ex: Leilão encerrado)
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}