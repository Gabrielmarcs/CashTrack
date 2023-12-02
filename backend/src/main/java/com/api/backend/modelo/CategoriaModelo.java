package com.api.backend.modelo;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "categoria")


public class CategoriaModelo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nome;
    private String descricao;
    
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private UsuarioModelo usuario;

    @OneToMany(mappedBy = "categoria", cascade = CascadeType.ALL, orphanRemoval = false)
    private List<GastoModelo> gastos = new ArrayList<>();


    public CategoriaModelo() {
    }
    
    public CategoriaModelo(String nome, String descricao) {
        this.nome = nome;
        this.descricao = descricao;
    }

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

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    
    public List<GastoModelo> getGastos() {
        return gastos;
    }

    // Método para adicionar um gasto à categoria
    public void adicionarGasto(GastoModelo gasto) {
        if (gasto != null) {
            gastos.add(gasto);
            gasto.setCategoria(this);
        }
    }


    // Método para remover um gasto da categoria
    public void removerGasto(GastoModelo gasto) {
        if (gasto != null && gastos.remove(gasto)) {
            gasto.setCategoria(null);
        }
    }

}
