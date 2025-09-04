package com.leilaoonline.leilao.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leilaoonline.leilao.model.Categoria;
import com.leilaoonline.leilao.model.Leilao;
import com.leilaoonline.leilao.model.Pessoa;
import com.leilaoonline.leilao.repository.CategoriaRepository;
import com.leilaoonline.leilao.repository.LeilaoRepository;
import com.leilaoonline.leilao.repository.PessoaRepository;

@Service
public class LeilaoService {

    @Autowired
    private LeilaoRepository leilaoRepository;
    
    @Autowired
    private PessoaRepository pessoaRepository;
    
    @Autowired
    private CategoriaRepository categoriaRepository;

    public Leilao criarLeilao(Leilao leilao, Long criadorId, Long categoriaId) {
        Optional<Pessoa> criador = pessoaRepository.findById(criadorId);
        Optional<Categoria> categoria = categoriaRepository.findById(categoriaId);

        if (criador.isEmpty() || categoria.isEmpty()) {
            throw new RuntimeException("Criador ou categoria não encontrados.");
        }
        
        leilao.setCriador(criador.get());
        leilao.setCategoria(categoria.get());
        
        return leilaoRepository.save(leilao);
    }
    
    public List<Leilao> listarTodos() {
        return leilaoRepository.findAll();
    }

    public Optional<Leilao> buscarPorId(Long id) {
        return leilaoRepository.findById(id);
    }
}