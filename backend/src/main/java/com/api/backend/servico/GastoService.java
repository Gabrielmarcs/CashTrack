package com.api.backend.servico;

import com.api.backend.modelo.GastoModelo;
import com.api.backend.repositorio.GastoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GastoService {

    private final GastoRepository gastoRepository;

    @Autowired
    public GastoService(GastoRepository gastoRepository) {
        this.gastoRepository = gastoRepository;
    }

    public GastoModelo adicionarGasto(GastoModelo gasto) {
        return gastoRepository.save(gasto);
    }

}
