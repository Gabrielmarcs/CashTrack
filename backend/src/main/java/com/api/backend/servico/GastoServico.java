package com.api.backend.servico;

import com.api.backend.modelo.GastoModelo;
import com.api.backend.repositorio.GastoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GastoServico {

    private final GastoRepositorio gastoRepository;

    @Autowired
    public GastoServico(GastoRepositorio gastoRepository) {
        this.gastoRepository = gastoRepository;
    }

    public GastoModelo adicionarGasto(GastoModelo gasto) {
        return gastoRepository.save(gasto);
    }

    public List<GastoModelo> listarTodosGastos() {
        return gastoRepository.findAll();
    }

    public GastoModelo editarGasto(Long id, GastoModelo gastoAtualizado) {
        return gastoRepository.save(gastoAtualizado);
    }

    public void excluirGasto(Long id) {
        gastoRepository.deleteById(id);
    }

    public Optional<GastoModelo> detalharGasto(Long id) {
        return gastoRepository.findById(id);
    }
    
}
