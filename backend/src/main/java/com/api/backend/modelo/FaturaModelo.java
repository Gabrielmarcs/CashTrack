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
@Table(name = "fatura")
@Getter
@Setter

public class FaturaModelo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nome;
    private double valorTotal = 0;

    @OneToMany(mappedBy = "fatura", cascade = CascadeType.ALL, orphanRemoval = false)
    private List<GastoModelo> gastos = new ArrayList<>();

    private int contadorGastos = 0;

    // Método para adicionar um gasto à fatura
    public void adicionarGasto(GastoModelo gasto) {
        if (gasto != null) {
            gastos.add(gasto);
            gasto.setFatura(this);
            atualizarValorTotal();
            contadorGastos++;
        }
    }

    // Método para remover um gasto da fatura
    public void removerGasto(GastoModelo gasto) {
        if (gasto != null && gastos.remove(gasto)) {
            gasto.setFatura(null);
            contadorGastos = gastos.size();
            atualizarValorTotal();
            
        }
    }
    

    // Método para calcular e atualizar o valor total da fatura
    private void atualizarValorTotal() {
        valorTotal = 0; // Define o valor total como zero antes de recalcular

        for (GastoModelo gasto : gastos) {
            valorTotal += gasto.getValor();
        } 
    }
    
        // Método para excluir uma fatura
        public boolean podeExcluir() {
            return gastos.isEmpty();
        }
    
}
