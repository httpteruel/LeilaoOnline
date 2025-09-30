package com.leilaoonline.leilao.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;

public class LanceCadastroDTO {

    @NotNull(message = "O valor do lance é obrigatório.")
    @Positive(message = "O valor do lance deve ser maior que zero.")
    private BigDecimal valor;

    @NotNull(message = "O ID da pessoa é obrigatório.")
    private Long pessoaId;

    @NotNull(message = "O ID do leilão é obrigatório.")
    private Long leilaoId;

    // Construtor, Getters e Setters
    public LanceCadastroDTO() {
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public Long getPessoaId() {
        return pessoaId;
    }

    public void setPessoaId(Long pessoaId) {
        this.pessoaId = pessoaId;
    }

    public Long getLeilaoId() {
        return leilaoId;
    }

    public void setLeilaoId(Long leilaoId) {
        this.leilaoId = leilaoId;
    }
}