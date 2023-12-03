package com.api.backend.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.backend.modelo.GastoModelo;
import com.api.backend.modelo.RespostaModelo;
import com.api.backend.servico.GastoServico;

@RequestMapping("/gastos")
@RestController
@CrossOrigin("*")
public class GastoControle {
    
    @Autowired
    private GastoServico gs;

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<RespostaModelo> removerGasto(@PathVariable long id){
        return gs.removerGasto(id);
    }

    @PutMapping("/alterar")
    public ResponseEntity<?> alterarGasto(@RequestBody GastoModelo gm){
        return gs.cadastrarAlterar(gm, "alterar");
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrarGasto(@RequestBody GastoModelo gm){
        return gs.cadastrarAlterar(gm, "cadastrar");
    }

    @GetMapping("/listar")
    public Iterable<GastoModelo> listarGastos(){
        return gs.listarGastos();
    }

    @PostMapping("/{gastoId}/associar-categoria/{categoriaId}")
    public ResponseEntity<?> associarCategoriaAoGasto(@PathVariable long gastoId, @PathVariable long categoriaId) {
        return gs.associarCategoriaAoGasto(gastoId, categoriaId);
    }
}
