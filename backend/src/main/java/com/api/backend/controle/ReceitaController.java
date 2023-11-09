
package com.api.backend.controle;

import com.api.backend.modelo.ReceitaModelo;
import com.api.backend.repositorio.ReceitaRepository;
import com.api.backend.servico.ReceitaService;

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
    public ReceitaModelo addReceita(@RequestBody ReceitaModelo receita) {
        return receitaService.addReceita(receita);
    }

    // listar todas as receitas
    @GetMapping
    public List<ReceitaModelo> getAllReceitas() {
        return receitaService.getAllReceitas();
    }

    // Atualizar uma receita
    @PutMapping("/{id}")
    public ResponseEntity<ReceitaModelo> updateReceita(@PathVariable Long id, @RequestBody ReceitaModelo receita) {
    if (receitaRepository.existsById(id)) {
        receita.setId(id);
        ReceitaModelo updatedReceita = receitaService.updateReceita(receita);
            return ResponseEntity.ok(updatedReceita);
    } else {
            return ResponseEntity.notFound().build();
    }
}
}
