package com.api.backend.modelo;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "categoria")
@Getter
@Setter

public class CategoriaModelo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nome;
    private String descricao;
    //quantidade de gastos que a categoria possui
    private int contadorGastos = 0;

    @OneToMany(mappedBy = "categoria", cascade = CascadeType.ALL, orphanRemoval = false)
    private List<GastoModelo> gastos = new ArrayList<>();

    // Método para adicionar um gasto à fatura
    public void adicionarGasto(GastoModelo gasto) {
        if (gasto != null) {
            gastos.add(gasto);
            gasto.setCategoria(this);
            contadorGastos++;
        }
    }

    // Método para remover um gasto da categoria
    public void removerGasto(GastoModelo gasto) {
        if (gasto != null && gastos.remove(gasto)) {
            gasto.setCategoria(null);
            contadorGastos--; // Decrementa o contador de gastos
        }
    }

}
