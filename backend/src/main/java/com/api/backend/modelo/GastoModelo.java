package com.api.backend.modelo;

import javax.persistence.*;

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
    private Double valor;
    private String metodoPagamento;

    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private CategoriaModelo categoria;

    @ManyToOne
    @JoinColumn(name = "fatura_id")
    private FaturaModelo fatura;

}
