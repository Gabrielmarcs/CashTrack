package com.api.backend.controle;

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
import com.api.backend.modelo.RespostaModelo;
import com.api.backend.servico.FaturaServico;

@RequestMapping("/fatura")
@RestController
@CrossOrigin("*")
public class FaturaControle {
    
    @Autowired
    private FaturaServico fs;
    
    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<RespostaModelo> removerFatura(@PathVariable long id){
        return fs.removerFatura(id);
    }

    @PutMapping("/alterar")
    public ResponseEntity<?> alterarFatura(@RequestBody FaturaModelo fm){
        return fs.cadastrarAlterar(fm, "alterar");
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrarFatura(@RequestBody FaturaModelo fm){
        return fs.cadastrarAlterar(fm, "cadastrar");
    }

    @GetMapping("/listar")
    public Iterable<FaturaModelo> listarFaturas(){
        return fs.listarFaturas();
    }
}
