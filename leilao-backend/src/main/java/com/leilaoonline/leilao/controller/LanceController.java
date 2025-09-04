package com.leilaoonline.leilao.controller;

import java.math.BigDecimal;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leilaoonline.leilao.model.Lance;
import com.leilaoonline.leilao.service.LanceService;

@RestController
@RequestMapping("/api/lances")
public class LanceController {

    @Autowired
    private LanceService lanceService;
    
    @PostMapping("/{leilaoId}")
    public ResponseEntity<?> darLance(@PathVariable Long leilaoId, @RequestBody Map<String, Object> request) {
        try {
            Long pessoaId = Long.valueOf(request.get("pessoaId").toString());
            BigDecimal valor = new BigDecimal(request.get("valor").toString());
            
            Lance novoLance = lanceService.registrarLance(leilaoId, pessoaId, valor);
            return new ResponseEntity<>(novoLance, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}