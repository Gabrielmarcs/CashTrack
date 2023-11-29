package com.api.backend.controle;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.backend.modelo.FaturaModelo;
import com.api.backend.repositorio.FaturaRepositorio;
import com.api.backend.servico.FaturaServico;

@RestController
@RequestMapping("/fatura")
@CrossOrigin(origins = "*")
public class FaturaControle {
    
    private final FaturaServico faturaService;
    private final FaturaRepositorio faturaRepository;

    @Autowired
    public FaturaControle(FaturaServico faturaService, FaturaRepositorio faturaRepository) {
        this.faturaService = faturaService;
        this.faturaRepository = faturaRepository;
    }

    @PostMapping("/cadastrar")
    public FaturaModelo addFatura(@RequestBody FaturaModelo fatura) {
        return faturaService.addFatura(fatura);
    }

    @GetMapping("/listar")
    public Iterable<FaturaModelo> listaFaturas() {
        return faturaService.listaFaturas();
    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<FaturaModelo> updateReceita(@PathVariable Long id, @RequestBody FaturaModelo fatura) {
        if (faturaRepository.existsById(id)) {
            fatura.setId(id);
            FaturaModelo updateFatura = faturaService.atualizaFatura(fatura);
            return ResponseEntity.ok(updateFatura);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<?> deletaFatura(@PathVariable Long id) {
        if (faturaRepository.existsById(id)) {
            faturaService.deletaFatura(id);
            return ResponseEntity.ok("Fatura deletada com sucesso");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/detalhes")
    public ResponseEntity<FaturaModelo> detalharFatura(@PathVariable Long id) {
        Optional<FaturaModelo> fatura = faturaService.buscaFatura(id);
        return fatura.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
