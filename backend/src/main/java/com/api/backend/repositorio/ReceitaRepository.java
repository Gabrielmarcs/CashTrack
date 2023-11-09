
package com.api.backend.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.backend.modelo.ReceitaModelo;

public interface ReceitaRepository extends JpaRepository<ReceitaModelo, Long> {
}
