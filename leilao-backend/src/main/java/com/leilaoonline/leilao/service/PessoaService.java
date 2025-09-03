package com.leilaoonline.leilao.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.leilaoonline.leilao.model.Pessoa;
import com.leilaoonline.leilao.repository.PessoaRepository;

@Service
public class PessoaService {

    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public Pessoa salvarPessoa(Pessoa pessoa) {

        pessoa.setSenha(passwordEncoder.encode(pessoa.getSenha()));
        return pessoaRepository.save(pessoa);
    }
}