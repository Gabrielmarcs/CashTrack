package com.api.backend.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.api.backend.modelo.FaturaModelo;
import com.api.backend.modelo.RespostaModelo;
import com.api.backend.repositorio.FaturaRepositorio;

@Service
public class FaturaServico {
    
    @Autowired
    private FaturaRepositorio fr;

    @Autowired
    private RespostaModelo rm;

    //listar faturas
    public Iterable<FaturaModelo> listarFaturas(){
        return fr.findAll();
    }

    //cadastrar/alterar fatura
    public ResponseEntity<?> cadastrarAlterar(FaturaModelo fm, String acao){
        if (fm.getNome().isEmpty()) {
            rm.setMensagem("Preencha todos os campos!");
            return new ResponseEntity<>(fm, HttpStatus.BAD_REQUEST);
        } else {
            if (acao.equals("cadastrar")) {
                return new ResponseEntity<FaturaModelo>(fr.save(fm), HttpStatus.CREATED);
            } else {
                return new ResponseEntity<FaturaModelo>(fr.save(fm), HttpStatus.OK);
            }
            
        }
    }

    //remover fatura
    public ResponseEntity<RespostaModelo> removerFatura(long id){
        fr.deleteById(id);
        rm.setMensagem("Fatura removida com sucesso!");
        return new ResponseEntity<RespostaModelo>(rm, HttpStatus.OK);
    }
}
