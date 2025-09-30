package com.leilaoonline.leilao.service;

import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leilaoonline.leilao.dto.LeilaoCadastroDTO;
import com.leilaoonline.leilao.model.Leilao;
import com.leilaoonline.leilao.model.Pessoa;
import com.leilaoonline.leilao.model.Categoria;
import com.leilaoonline.leilao.repository.LeilaoRepository;
import com.leilaoonline.leilao.repository.PessoaRepository;
import com.leilaoonline.leilao.repository.CategoriaRepository;

@Service
public class LeilaoService {

    @Autowired
    private LeilaoRepository leilaoRepository;

    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    public Leilao criarLeilao(LeilaoCadastroDTO leilaoCadastroDTO) {
        // 1. Busca as entidades de referência (Criador e Categoria)
        Pessoa criador = pessoaRepository.findById(leilaoCadastroDTO.getCriadorId())
                .orElseThrow(() -> new RuntimeException("Criador não encontrado"));

        Categoria categoria = categoriaRepository.findById(leilaoCadastroDTO.getCategoriaId())
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        // 2. Converte o DTO para a Entidade Leilao
        Leilao leilao = new Leilao();

        // Copia propriedades. Assume que 'titulo', 'descricao', 'valorInicial',
        // 'dataFim'
        // E 'imageUrl' (o novo campo) têm nomes idênticos no DTO e na Entidade Leilao.
        BeanUtils.copyProperties(leilaoCadastroDTO, leilao);

        // 3. Define a data de início (lógica de negócio)
        leilao.setDataInicio(LocalDateTime.now());

        // 4. Associa as entidades encontradas (Criador e Categoria)
        leilao.setCriador(criador);
        leilao.setCategoria(categoria);

        // 5. Salva no banco de dados
        return leilaoRepository.save(leilao);
    }

    public List<Leilao> listarTodos() {
        return leilaoRepository.findAll();
    }

    public Optional<Leilao> buscarPorId(Long id) {
        return leilaoRepository.findById(id);
    }
}