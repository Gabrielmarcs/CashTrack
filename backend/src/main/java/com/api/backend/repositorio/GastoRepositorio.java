package com.api.backend.repositorio;

import com.api.backend.modelo.GastoModelo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GastoRepositorio extends JpaRepository<GastoModelo, Long> {
}
