package com.api.backend.modelo;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "gastos")
public class GastoModelo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String categoria;
    private Double valor;
    private Date data;
    private String metodoPagamento;

    // Getters
    public Long getId() {
        return id;
    }

    public String getCategoria() {
        return categoria;
    }

    public Double getValor() {
        return valor;
    }

    public Date getData() {
        return data;
    }

    public String getMetodoPagamento() {
        return metodoPagamento;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public void setMetodoPagamento(String metodoPagamento) {
        this.metodoPagamento = metodoPagamento;
    }
}
