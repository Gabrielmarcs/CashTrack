package com.api.backend.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.backend.modelo.FaturaModelo;

public interface FaturaRepositorio extends JpaRepository<FaturaModelo, Long>{

}
