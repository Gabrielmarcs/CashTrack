package com.api.backend.modelo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "gasto")

@Getter
@Setter

public class GastoModelo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String descricao;
    private double valor;
    
    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private CategoriaModelo categoria;

    @ManyToOne
    @JoinColumn(name = "fatura_id")
    private FaturaModelo fatura;
}