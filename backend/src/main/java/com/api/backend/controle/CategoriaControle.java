package com.api.backend.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.api.backend.modelo.CategoriaModelo;
import com.api.backend.repositorio.CategoriaRepositorio;
import com.api.backend.servico.CategoriaServico;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/categoria")
public class CategoriaControle {
    
    @Autowired
    private final CategoriaRepositorio categoriaRepositorio;
    private final CategoriaServico categoriaServico;

    public CategoriaControle(CategoriaRepositorio categoriaRepositorio, CategoriaServico categoriaServico) {
        this.categoriaRepositorio = categoriaRepositorio;
        this.categoriaServico = categoriaServico;
    }

    @PostMapping("/cadastrar")
    public CategoriaModelo cadastrarCategoria(@RequestBody CategoriaModelo categoria) {
        return categoriaServico.addCategoria(categoria);
    }

    @GetMapping
    public List<CategoriaModelo> listarCategorias() {
        return categoriaServico.listaCategorias();
    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<CategoriaModelo> atualizarCategoria(@PathVariable Long id, @RequestBody CategoriaModelo categoria) {
        if (categoriaRepositorio.existsById(id)) {
            categoria.setId(id);
            CategoriaModelo updatedCategoria = categoriaServico.atualizaCategoria(categoria);
            return ResponseEntity.ok(updatedCategoria);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<?> deletarCategoria(@PathVariable Long id) {
        if (categoriaRepositorio.existsById(id)) {
            categoriaServico.deletaCategoria(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
