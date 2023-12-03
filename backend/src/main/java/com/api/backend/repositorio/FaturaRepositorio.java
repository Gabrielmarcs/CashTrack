package com.api.backend.repositorio;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.api.backend.modelo.FaturaModelo;

@Repository
public interface FaturaRepositorio extends CrudRepository<FaturaModelo, Long>{
    
}
