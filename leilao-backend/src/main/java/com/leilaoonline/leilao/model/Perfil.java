package com.leilaoonline.leilao.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class Perfil {
    
    @Entity
    @Table(name = "perfis")
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public class Perfil{

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(unique = true, nullable = false)
        private Long id;

        @Column(unique = true, nullable = false)
        private String nome;

        @OneToMany(mappedBy= "perfil")
        private List<PessoaPerfil> pessoaPerfis;

    }
}
