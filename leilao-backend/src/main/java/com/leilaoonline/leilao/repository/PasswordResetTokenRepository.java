package com.leilaoonline.leilao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.leilaoonline.leilao.model.PasswordResetToken;
import com.leilaoonline.leilao.model.Pessoa;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    PasswordResetToken findByToken(String token);
    PasswordResetToken findByPessoa(Pessoa pessoa);
}