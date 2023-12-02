package com.api.backend.repositorio;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.api.backend.modelo.CategoriaModelo;

@Repository
public interface CategoriaRepositorio extends CrudRepository<CategoriaModelo, Long>{
}
