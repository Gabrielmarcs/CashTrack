package com.api.backend.servico;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.backend.modelo.FaturaModelo;
import com.api.backend.repositorio.FaturaRepositorio;

@Service
public class FaturaServico {
    private final FaturaRepositorio faturaRepositorio;

    @Autowired
    public FaturaServico(FaturaRepositorio faturaRepositorio) {
        this.faturaRepositorio = faturaRepositorio;
    }

    //adicionar uma fatura
    public FaturaModelo addFatura(FaturaModelo fatura) {
        return faturaRepositorio.save(fatura);
    }

    //listar todas as faturas
    public Iterable<FaturaModelo> listaFaturas() {
        return faturaRepositorio.findAll();
    }

    //atualizar uma fatura
    public FaturaModelo atualizaFatura(FaturaModelo fatura) {
        return faturaRepositorio.save(fatura);
    }

    //deletar uma fatura
    public void deletaFatura(Long id) {
        Optional<FaturaModelo> faturaASerRemovida = faturaRepositorio.findById(id);
    
        if (faturaASerRemovida.isPresent()) {
            FaturaModelo fatura = faturaASerRemovida.get();
            
            if (fatura.podeExcluir()) {
                faturaRepositorio.deleteById(id);
            } else {
                throw new RuntimeException("Fatura não pode ser excluída pois possui gastos associados");
            }
        } else {
            throw new RuntimeException("Fatura não encontrada");
        }
    }

    //buscar uma fatura
    public Optional<FaturaModelo> buscaFatura(Long id) {
        return faturaRepositorio.findById(id);
    }
}
