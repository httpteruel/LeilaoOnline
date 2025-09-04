package com.leilaoonline.leilao.security;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.leilaoonline.leilao.model.Pessoa;
import com.leilaoonline.leilao.repository.PessoaRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private PessoaRepository pessoaRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Pessoa pessoa = pessoaRepository.findByEmail(email);
        if (pessoa == null) {
            throw new UsernameNotFoundException("Usuário não encontrado com o email: " + email);
        }
        return new org.springframework.security.core.userdetails.User(pessoa.getEmail(), pessoa.getSenha(), new ArrayList<>());
    }
}