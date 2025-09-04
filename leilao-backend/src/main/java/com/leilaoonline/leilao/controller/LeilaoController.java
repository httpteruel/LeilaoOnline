package com.leilaoonline.leilao.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.leilaoonline.leilao.model.Leilao;
import com.leilaoonline.leilao.service.LeilaoService;

@RestController
@RequestMapping("/api/leiloes")
public class LeilaoController {

    @Autowired
    private LeilaoService leilaoService;

    @PostMapping
    public ResponseEntity<Leilao> criarLeilao(@RequestBody Leilao leilao,
                                              @RequestParam Long criadorId,
                                              @RequestParam Long categoriaId) {
        try {
            Leilao novoLeilao = leilaoService.criarLeilao(leilao, criadorId, categoriaId);
            return new ResponseEntity<>(novoLeilao, HttpStatus.CREATED);
        } catch (RuntimeException e) {
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