package com.api.backend.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.api.backend.modelo.CategoriaModelo;
import com.api.backend.modelo.RespostaModelo;
import com.api.backend.repositorio.CategoriaRepositorio;

@Service
public class CategoriaServico {
    
    @Autowired
    private CategoriaRepositorio cr;

    @Autowired
    private RespostaModelo rm;

    //listar categorias
    public Iterable<CategoriaModelo> listarCategorias(){
        return cr.findAll();
    }

    //cadastrar/alterar categoria
    public ResponseEntity<?> cadastrarAlterar(CategoriaModelo cm, String acao){
        if (cm.getNome().isEmpty() || cm.getDescricao().isEmpty()) {
            rm.setMensagem("Preencha todos os campos!");
            return new ResponseEntity<>(cm, HttpStatus.BAD_REQUEST);
        } else {
            if (acao.equals("cadastrar")) {
                return new ResponseEntity<CategoriaModelo>(cr.save(cm), HttpStatus.CREATED);
            } else {
                return new ResponseEntity<CategoriaModelo>(cr.save(cm), HttpStatus.OK);
            } 
        }
    }

    //remover categoria
    public ResponseEntity<RespostaModelo> removerCategoria(long id){
        cr.deleteById(id);
        rm.setMensagem("Categoria removida com sucesso!");
        return new ResponseEntity<RespostaModelo>(rm, HttpStatus.OK);
    }
}
