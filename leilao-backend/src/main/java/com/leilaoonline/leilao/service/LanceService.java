package com.leilaoonline.leilao.service;

import java.time.LocalDateTime;
import java.math.BigDecimal;
import java.util.Comparator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leilaoonline.leilao.dto.LanceCadastroDTO;
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

    // CORREÇÃO: Método agora aceita LanceCadastroDTO
    public Lance darLance(LanceCadastroDTO dto) {
        // 1. Busca as entidades
        Leilao leilao = leilaoRepository.findById(dto.getLeilaoId())
                .orElseThrow(() -> new RuntimeException("Leilão não encontrado."));

        Pessoa pessoa = pessoaRepository.findById(dto.getPessoaId())
                .orElseThrow(() -> new RuntimeException("Pessoa (ofertante) não encontrada."));

        // 2. Validações de Negócio

        // 2.1. O criador não pode dar lance
        if (leilao.getCriador().getId().equals(pessoa.getId())) {
            throw new RuntimeException("O criador não pode dar lance no próprio leilão.");
        }

        // 2.2. O leilão deve estar ativo
        LocalDateTime agora = LocalDateTime.now();
        if (agora.isBefore(leilao.getDataInicio())) {
            throw new RuntimeException("O leilão ainda não foi iniciado.");
        }
        if (agora.isAfter(leilao.getDataFim())) {
            throw new RuntimeException("O leilão já foi encerrado.");
        }

        // 2.3. Valida o valor do lance
        // Assumindo que a lista de lances em Leilao foi carregada (necessário
        // @Transactional ou FetchType.EAGER)
        BigDecimal maiorLanceAtual = leilao.getLances().stream()
                .max(Comparator.comparing(Lance::getValor))
                .map(Lance::getValor)
                .orElse(leilao.getValorInicial()); // Se não houver lances, usa o valor inicial

        if (dto.getValor().compareTo(maiorLanceAtual) <= 0) {
            throw new RuntimeException("O lance deve ser maior que o valor atual: R$ " + maiorLanceAtual);
        }

        // 3. Cria e Salva o Lance
        Lance novoLance = new Lance();
        novoLance.setValor(dto.getValor());
        novoLance.setDataLance(agora);
        novoLance.setPessoa(pessoa);
        novoLance.setLeilao(leilao);

        return lanceRepository.save(novoLance);
    }
}