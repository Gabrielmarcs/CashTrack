package com.api.backend.servico;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.api.backend.modelo.GastoModelo;
import com.api.backend.modelo.RespostaModelo;
import com.api.backend.repositorio.GastoRepositorio;

@Service
public class GastoServico {
    
    @Autowired
    private GastoRepositorio gr;

    @Autowired
    private RespostaModelo rm;

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
}
