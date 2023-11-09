package com.api.backend.repositorio;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.api.backend.modelo.UsuarioModelo;

@Repository
public interface UsuarioRepositorio extends CrudRepository<UsuarioModelo, Long>{
    UsuarioModelo findByEmail(String email);
}
