package com.leilaoonline.leilao.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leilaoonline.leilao.model.Perfil;
import com.leilaoonline.leilao.repository.PerfilRepository;

@Service
public class PerfilService {

    @Autowired
    private PerfilRepository perfilRepository;

    public Perfil salvarPerfil(Perfil perfil) {
        return perfilRepository.save(perfil);
    }

    public List<Perfil> listarTodos() {
        return perfilRepository.findAll();
    }

    public Optional<Perfil> buscarPorId(Long id) {
        return perfilRepository.findById(id);
    }
}