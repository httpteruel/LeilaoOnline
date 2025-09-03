package com.leilaoonline.leilao.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leilaoonline.leilao.dto.PessoaCadastroDTO;
import com.leilaoonline.leilao.model.Pessoa;
import com.leilaoonline.leilao.service.PessoaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/pessoas")
public class PessoaController {

    @Autowired
    private PessoaService pessoaService;

    @PostMapping("/cadastro")
    public ResponseEntity<Pessoa> cadastrarPessoa(@RequestBody @Valid PessoaCadastroDTO pessoaCadastroDTO) {
        Pessoa pessoa = new Pessoa();
        BeanUtils.copyProperties(pessoaCadastroDTO, pessoa);

        Pessoa novaPessoa = pessoaService.salvarPessoa(pessoa);
        return new ResponseEntity<>(novaPessoa, HttpStatus.CREATED);
    }
}