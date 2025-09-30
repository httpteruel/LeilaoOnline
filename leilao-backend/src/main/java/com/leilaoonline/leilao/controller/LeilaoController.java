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

import com.leilaoonline.leilao.dto.LeilaoCadastroDTO; 
import com.leilaoonline.leilao.model.Leilao;
import com.leilaoonline.leilao.service.LeilaoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/leiloes")
@CrossOrigin(origins = "http://localhost:3000")
public class LeilaoController {

    @Autowired
    private LeilaoService leilaoService;

    @PostMapping
    // CORREÇÃO: Recebe apenas o DTO no corpo da requisição (@RequestBody)
    public ResponseEntity<Leilao> criarLeilao(@RequestBody @Valid LeilaoCadastroDTO leilaoCadastroDTO) {
        try {
            Leilao novoLeilao = leilaoService.criarLeilao(leilaoCadastroDTO);
            return new ResponseEntity<>(novoLeilao, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            // Em caso de "Criador não encontrado" ou erro de validação
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<List<Leilao>> listarLeiloes() {
        List<Leilao> leiloes = leilaoService.listarTodos();
        return new ResponseEntity<>(leiloes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Leilao> buscarLeilaoPorId(@PathVariable Long id) {
        Optional<Leilao> leilao = leilaoService.buscarPorId(id);
        if (leilao.isPresent()) {
            return new ResponseEntity<>(leilao.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}