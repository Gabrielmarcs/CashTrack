package com.api.backend.modelo;

import javax.persistence.*;

@Entity
@Table(name = "receita")
public class ReceitaModelo {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private double valor;
    

    // Construtores
    public ReceitaModelo() {
    }

    public ReceitaModelo(String nome, double valor) {
        this.nome = nome;
        this.valor = valor;
    }

    // Getters e setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }
}
