package com.api.backend.servico;

import com.api.backend.modelo.CategoriaModelo;
import com.api.backend.modelo.FaturaModelo;
import com.api.backend.modelo.GastoModelo;
import com.api.backend.repositorio.CategoriaRepositorio;
import com.api.backend.repositorio.FaturaRepositorio;
import com.api.backend.repositorio.GastoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GastoServico {

    private final GastoRepositorio gastoRepository;
    private final CategoriaRepositorio categoriaRepository;
    private final FaturaRepositorio faturaRepository;

    @Autowired
    public GastoServico(GastoRepositorio gastoRepository, CategoriaRepositorio categoriaRepository, FaturaRepositorio faturaRepository, CategoriaRepositorio categoriaRepository1) {
        this.gastoRepository = gastoRepository;
        this.categoriaRepository = categoriaRepository;
        this.faturaRepository = faturaRepository;
    }

    public GastoModelo addGasto(GastoModelo gasto, Long idCategoria, Long idFatura) {
        Optional<CategoriaModelo> umaCategoria = categoriaRepository.findById(idCategoria);
        Optional<FaturaModelo> umaFatura = faturaRepository.findById(idFatura);
    
        if (umaCategoria.isPresent()) {
            CategoriaModelo categoria = umaCategoria.get();
            if(umaFatura.isPresent()) {
                FaturaModelo fatura = umaFatura.get();            
                gasto.setCategoria(categoria);
                gasto.setFatura(fatura);
                
                GastoModelo novoGasto = gastoRepository.save(gasto); // Salva o gasto
    
                fatura.adicionarGasto(novoGasto); // Chama o método para adicionar o gasto na fatura
                faturaRepository.save(fatura); // Salva a fatura atualizada
                
                return novoGasto; // Retorna o gasto salvo
            } else {
                throw new RuntimeException("Fatura não encontrada");
            }
        } else {
            throw new RuntimeException("Categoria não encontrada");
        }
    }
    
    public List<GastoModelo> listarTodosGastos() {
        return gastoRepository.findAll();
    }

    public GastoModelo updateGasto(Long id, GastoModelo gastoAtualizado) {
        return gastoRepository.save(gastoAtualizado);
    }

    public void deleteGasto(Long id) {
        Optional<GastoModelo> gastoASerRemovido = gastoRepository.findById(id);
    
        if (gastoASerRemovido.isPresent()) {
            GastoModelo gasto = gastoASerRemovido.get();
            FaturaModelo fatura = gasto.getFatura();
            CategoriaModelo categoria = gasto.getCategoria();
    
            
    
            fatura.removerGasto(gasto);
    
            // Salva as atualizações na fatura e na categoria
            faturaRepository.save(fatura);
            categoriaRepository.save(categoria);
        } else {
            throw new RuntimeException("Gasto não encontrado");
        }
    }
    
    
    public Optional<GastoModelo> detalharGasto(Long id) {
        return gastoRepository.findById(id);
    }
    
}
