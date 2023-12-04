package com.api.backend.servico;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.api.backend.modelo.CategoriaModelo;
import com.api.backend.modelo.FaturaModelo;
import com.api.backend.modelo.GastoModelo;
import com.api.backend.modelo.RespostaModelo;
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

    /* 
    //listar gastos
    public Iterable<GastoModelo> listarGastos(){
        return gr.findAll();
    }

    //cadastrar/alterar gasto
    public ResponseEntity<?> cadastrarAlterar(GastoModelo gm, String acao){
        if (gm.getDescricao().isEmpty() || gm.getMetodoPagamento().isEmpty() || gm.getValor() == 0) {
            rm.setMensagem("Preencha todos os campos!");
            return new ResponseEntity<>(gm, HttpStatus.BAD_REQUEST);
        } else {
            if (acao.equals("cadastrar")) {
                return new ResponseEntity<GastoModelo>(gr.save(gm), HttpStatus.CREATED);
            } else {
                return new ResponseEntity<GastoModelo>(gr.save(gm),HttpStatus.OK);
            }
        }
    }

    //remover gasto
    public ResponseEntity<RespostaModelo> removerGasto(long id){
        gr.deleteById(id);
        rm.setMensagem("Gasto removido com sucesso!");
        return new ResponseEntity<RespostaModelo>(rm, HttpStatus.OK);
    }


    public ResponseEntity<?> associarCategoriaAoGasto(long gastoId, long categoriaId) {
        GastoModelo gasto = gr.findById(gastoId).orElse(null);
        CategoriaModelo categoria = cr.findById(categoriaId).orElse(null);

        if (gasto != null && categoria != null) {
            gasto.setCategoria(categoria);
            gr.save(gasto);
            rm.setMensagem("Categoria associada ao gasto com sucesso.");
            return new ResponseEntity<>(rm, HttpStatus.OK);
        } else {
            rm.setMensagem("Gasto ou categoria não encontrada.");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        }
    }
    */
}
