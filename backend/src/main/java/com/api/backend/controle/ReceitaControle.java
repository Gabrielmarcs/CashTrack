
package com.api.backend.controle;

import com.api.backend.modelo.ReceitaModelo;
import com.api.backend.repositorio.ReceitaRepositorio;
import com.api.backend.servico.ReceitaServico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/receitas")
public class ReceitaControle {

    private final ReceitaServico receitaService;
    private final ReceitaRepositorio receitaRepository;

    @Autowired
    public ReceitaControle(ReceitaServico receitaService, ReceitaRepositorio receitaRepository) {
        this.receitaService = receitaService;
        this.receitaRepository = receitaRepository;
    }

    // Adicionar uma nova receita
    @PostMapping
    public ReceitaModelo addReceita(@RequestBody ReceitaModelo receita) {
        return receitaService.addReceita(receita);
    }

    // Listar todas as receitas
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

    // Deletar uma receita
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReceita(@PathVariable Long id) {
        if (receitaRepository.existsById(id)) {
            receitaService.deleteReceita(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

