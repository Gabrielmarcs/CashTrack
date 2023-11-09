
package com.api.backend.servico;

import com.api.backend.modelo.ReceitaModelo;
import com.api.backend.repositorio.ReceitaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReceitaService {

    private final ReceitaRepository receitaRepository;

    @Autowired
    public ReceitaService(ReceitaRepository receitaRepository) {
        this.receitaRepository = receitaRepository;
    }

    // adicionar uma receita
    public ReceitaModelo addReceita(ReceitaModelo receita) {
        return receitaRepository.save(receita);
    }

    // listar todas as receitas
    public List<ReceitaModelo> getAllReceitas() {
        return receitaRepository.findAll();
    }

    // atualizar uma receita
    public ReceitaModelo updateReceita(ReceitaModelo receita) {
        return receitaRepository.save(receita);
    }
}
