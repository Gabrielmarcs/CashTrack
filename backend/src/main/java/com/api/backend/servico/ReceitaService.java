
package com.api.backend.servico;

import com.api.backend.modelo.Receita;
import com.api.backend.modelo.ReceitaRepository;
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
    public Receita addReceita(Receita receita) {
        return receitaRepository.save(receita);
    }

}
