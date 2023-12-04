package com.api.backend.servico;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.api.backend.modelo.CategoriaModelo;
import com.api.backend.modelo.FaturaModelo;
import com.api.backend.modelo.GastoModelo;
import com.api.backend.repositorio.CategoriaRepositorio;
import com.api.backend.repositorio.FaturaRepositorio;
import com.api.backend.repositorio.GastoRepositorio;

@Service
public class GastoServico {
    
    private final GastoRepositorio gastoRepositorio;
    private final CategoriaRepositorio categoriaRepositorio;
    private final FaturaRepositorio faturaRepositorio;


    @Autowired
    public GastoServico(GastoRepositorio gastoRepositorio, CategoriaRepositorio categoriaRepositorio, FaturaRepositorio faturaRepositorio) {
        this.gastoRepositorio = gastoRepositorio;
        this.categoriaRepositorio = categoriaRepositorio;
        this.faturaRepositorio = faturaRepositorio;
    }

    public void gravarInformacoes(GastoModelo gasto) {
         FaturaModelo fatura = gasto.getFatura();
         CategoriaModelo categoria = gasto.getCategoria();
         faturaRepositorio.save(fatura);
         categoriaRepositorio.save(categoria);
    }

    public GastoModelo cadastrar(String descricao, double valor, long categoriaId, long faturaId) {
        CategoriaModelo categoria = categoriaRepositorio.findById(categoriaId).orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
        FaturaModelo fatura = faturaRepositorio.findById(faturaId).orElseThrow(() -> new RuntimeException("Fatura não encontrada"));

        GastoModelo gasto = new GastoModelo();
        gasto.setDescricao(descricao);
        gasto.setValor(valor);
        gasto.setCategoria(categoria);
        gasto.setFatura(fatura);

        // Salvar o gasto
        return gastoRepositorio.save(gasto);
    }

    public Iterable<GastoModelo> listar() {
        return gastoRepositorio.findAll();
    }

    public List<GastoModelo> listarGastosPorCategoria(long categoriaId) {
        CategoriaModelo categoria = categoriaRepositorio.findById(categoriaId)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        return gastoRepositorio.findByCategoria(categoria);
    }

    public GastoModelo alterarGasto(long gastoId, String novaDescricao, double novoValor, long novaCategoriaId, long novaFaturaId) {
        GastoModelo gasto = gastoRepositorio.findById(gastoId).orElseThrow(() -> new RuntimeException("Gasto não encontrado"));
        CategoriaModelo novaCategoria = categoriaRepositorio.findById(novaCategoriaId).orElseThrow(() -> new RuntimeException("Nova categoria não encontrada"));
        FaturaModelo novaFatura = faturaRepositorio.findById(novaFaturaId).orElseThrow(() -> new RuntimeException("Nova fatura não encontrada"));
    
        // Atualizar os detalhes do gasto
        gasto.setDescricao(novaDescricao);
        gasto.setValor(novoValor);
        gasto.setCategoria(novaCategoria);
        gasto.setFatura(novaFatura);
    
        // Salvar as alterações
        return gastoRepositorio.save(gasto);
    }

    public void excluirGastoPorId(long gastoId) {
        GastoModelo gasto = gastoRepositorio.findById(gastoId)
            .orElseThrow(() -> new RuntimeException("Gasto não encontrado"));

        gastoRepositorio.delete(gasto);
    }

    

}
