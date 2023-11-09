
package com.api.backend.controlador;

import com.api.backend.modelo.Receita;
import com.api.backend.servico.ReceitaService;
import com.api.backend.modelo.ReceitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/receitas")
public class ReceitaController {

    private final ReceitaService receitaService;
    private final ReceitaRepository receitaRepository;

    @Autowired
    public ReceitaController(ReceitaService receitaService, ReceitaRepository receitaRepository) {
        this.receitaService = receitaService;
        this.receitaRepository = receitaRepository;
    }

    // adicionar uma nova receita
    @PostMapping
    public Receita addReceita(@RequestBody Receita receita) {
        return receitaService.addReceita(receita);
    }

}
