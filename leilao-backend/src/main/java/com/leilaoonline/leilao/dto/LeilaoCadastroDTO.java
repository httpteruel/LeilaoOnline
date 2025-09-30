package com.leilaoonline.leilao.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class LeilaoCadastroDTO {

    @NotBlank(message = "O título é obrigatório.")
    private String titulo;

    @NotBlank(message = "A descrição é obrigatória.")
    private String descricao;

    // NOVO CAMPO: URL da Imagem
    private String imageUrl; // Pode ser @URL ou @NotBlank se for obrigatório

    @NotNull(message = "O valor inicial é obrigatório.")
    @Positive(message = "O valor inicial deve ser maior que zero.")
    private BigDecimal valorInicial;

    @NotNull(message = "A data de fim é obrigatória.")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private LocalDateTime dataFim;

    @NotNull(message = "O ID do criador é obrigatório.")
    private Long criadorId;

    @NotNull(message = "O ID da categoria é obrigatório.")
    private Long categoriaId;

    // Construtor padrão (mantenha)
    public LeilaoCadastroDTO() {
    }

    // Getters e Setters
    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    // NOVO GETTER E SETTER para imageUrl
    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public BigDecimal getValorInicial() {
        return valorInicial;
    }

    public void setValorInicial(BigDecimal valorInicial) {
        this.valorInicial = valorInicial;
    }

    public LocalDateTime getDataFim() {
        return dataFim;
    }

    public void setDataFim(LocalDateTime dataFim) {
        this.dataFim = dataFim;
    }

    public Long getCriadorId() {
        return criadorId;
    }

    public void setCriadorId(Long criadorId) {
        this.criadorId = criadorId;
    }

    public Long getCategoriaId() {
        return categoriaId;
    }

    public void setCategoriaId(Long categoriaId) {
        this.categoriaId = categoriaId;
    }
}