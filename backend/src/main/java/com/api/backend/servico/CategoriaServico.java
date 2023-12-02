package com.api.backend.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.backend.modelo.CategoriaModelo;
import com.api.backend.repositorio.CategoriaRepositorio;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoriaServico {
    private final CategoriaRepositorio categoriaRepositorio;

    @Autowired
    public CategoriaServico(CategoriaRepositorio categoriaRepositorio) {
        this.categoriaRepositorio = categoriaRepositorio;
    }

    // adicionar uma categoria
    public CategoriaModelo addCategoria(CategoriaModelo categoria) {
        return categoriaRepositorio.save(categoria);
    }

    public List<CategoriaModelo> listaCategorias() {
        Iterable<CategoriaModelo> categoriasIterable = categoriaRepositorio.findAll();
        List<CategoriaModelo> categoriasList = new ArrayList<>();

        categoriasIterable.forEach(categoriasList::add); // Convertendo Iterable para List

        return categoriasList;
    }

    // atualizar uma categoria
    public CategoriaModelo atualizaCategoria(CategoriaModelo categoria) {
        return categoriaRepositorio.save(categoria);
    }

    // deletar uma categoria
    public void deletaCategoria(Long id) {
        categoriaRepositorio.deleteById(id);
    }
}
