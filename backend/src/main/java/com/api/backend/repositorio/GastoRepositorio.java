package com.api.backend.repositorio;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.api.backend.modelo.CategoriaModelo;
import com.api.backend.modelo.GastoModelo;

@Repository
public interface GastoRepositorio extends CrudRepository<GastoModelo, Long>{
    List<GastoModelo> findByCategoria(CategoriaModelo categoria);
}
