package com.api.backend.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
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

import com.api.backend.modelo.CategoriaModelo;
import com.api.backend.modelo.RespostaModelo;
import com.api.backend.servico.CategoriaServico;

@RequestMapping("/categoria")
@RestController
@CrossOrigin("*")
public class CategoriaControle {
    
    @Autowired
    private CategoriaServico cs;

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<RespostaModelo> removerCategoria(@PathVariable long id){
        try {
            return cs.removerCategoria(id);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.badRequest().body(new RespostaModelo("Há gastos associados a essa categoria"));
        } 
    }

    @PutMapping("/alterar")
    public ResponseEntity<?> alterarCategoria(@RequestBody CategoriaModelo cm){
        return cs.cadastrarAlterar(cm, "alterar");
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrarCategoria(@RequestBody CategoriaModelo cm){
        return cs.cadastrarAlterar(cm, "cadastrar");
    }

    @GetMapping("/listar")
    public Iterable<CategoriaModelo> listarCategorias(){
        return cs.listarCategorias();
    }
}
