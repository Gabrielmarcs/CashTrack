package com.api.backend.modelo;

import javax.persistence.*;

@Entity
@Table(name = "receitas")
public class ReceitaModelo {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String descricao;
    private double valor;
    //receita tem um usuario
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private UsuarioModelo usuario;

    // Construtores
    public ReceitaModelo() {
    }

    public ReceitaModelo(String descricao, double valor) {
        this.descricao = descricao;
        this.valor = valor;
    }

    // Getters e setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }
}
