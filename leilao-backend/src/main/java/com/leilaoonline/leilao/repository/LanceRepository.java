package com.leilaoonline.leilao.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.leilaoonline.leilao.model.Lance;

@Repository
public interface LanceRepository extends JpaRepository<Lance, Long> {
    List<Lance> findByLeilaoId(Long leilaoId);
}