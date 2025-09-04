package com.leilaoonline.leilao.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leilaoonline.leilao.model.Lance;
import com.leilaoonline.leilao.model.Leilao;
import com.leilaoonline.leilao.model.Pessoa;
import com.leilaoonline.leilao.repository.LanceRepository;
import com.leilaoonline.leilao.repository.LeilaoRepository;
import com.leilaoonline.leilao.repository.PessoaRepository;

@Service
public class LanceService {

    @Autowired
    private LanceRepository lanceRepository;
    
    @Autowired
    private LeilaoRepository leilaoRepository;

    @Autowired
    private PessoaRepository pessoaRepository;

    public Lance registrarLance(Long leilaoId, Long pessoaId, BigDecimal valor) {
        Optional<Leilao> leilaoOpt = leilaoRepository.findById(leilaoId);
        Optional<Pessoa> pessoaOpt = pessoaRepository.findById(pessoaId);

        if (leilaoOpt.isEmpty() || pessoaOpt.isEmpty()) {
            throw new RuntimeException("Leilão ou Pessoa não encontrados.");
        }

        Leilao leilao = leilaoOpt.get();
        Pessoa pessoa = pessoaOpt.get();
        
        if (leilao.getCriador().getId().equals(pessoaId)) {
            throw new RuntimeException("O criador não pode dar lances no próprio leilão.");
        }
        
        if (leilao.getDataFim().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Leilão já finalizado.");
        }

        BigDecimal valorMinimo = leilao.getValorInicial();
        
        Optional<Lance> ultimoLance = leilao.getLances().stream()
                .max((l1, l2) -> l1.getValor().compareTo(l2.getValor()));

        if (ultimoLance.isPresent()) {
            valorMinimo = ultimoLance.get().getValor();
        }
        
        if (valor.compareTo(valorMinimo) <= 0) {
            throw new RuntimeException("O valor do lance deve ser maior que o último lance ou o valor inicial.");
        }
        
        Lance novoLance = new Lance();
        novoLance.setLeilao(leilao);
        novoLance.setPessoa(pessoa);
        novoLance.setValor(valor);
        novoLance.setDataLance(LocalDateTime.now());
        
        return lanceRepository.save(novoLance);
    }
}