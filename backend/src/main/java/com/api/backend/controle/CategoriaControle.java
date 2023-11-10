package com.api.backend.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.backend.modelo.CategoriaModelo;
import com.api.backend.repositorio.CategoriaRepositorio;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/categorias")
public class CategoriaControle {
    
    @Autowired
    private CategoriaRepositorio categoriaRepositorio;

    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrarCategoria(@RequestBody CategoriaModelo categoria) {
        // Verificar se categoria já está cadastrada
        if (categoriaRepositorio.findByNome(categoria.getNome()) != null) {
            return new ResponseEntity<>("Categoria já está em uso", HttpStatus.BAD_REQUEST);
        }
        // Salvando a nova categoria no banco de dados
        categoriaRepositorio.save(categoria);
        return new ResponseEntity<>("Categoria cadastrada com sucesso!", HttpStatus.OK);
    }
}
