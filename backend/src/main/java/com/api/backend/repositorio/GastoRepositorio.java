package com.api.backend.repositorio;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.api.backend.modelo.GastoModelo;

@Repository
public interface GastoRepositorio extends CrudRepository<GastoModelo, Long>{
    
}
