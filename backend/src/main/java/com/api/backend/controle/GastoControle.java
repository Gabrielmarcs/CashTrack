package com.api.backend.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.backend.servico.GastoServico;
import com.api.backend.modelo.GastoModelo;

@RequestMapping("/gastos")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class GastoControle {

    private final GastoServico gastoServico;

    @Autowired
    public GastoControle(GastoServico gastoServico) {
        this.gastoServico = gastoServico;
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrarGasto(@RequestBody GastoModelo gasto) {
        try {
            GastoModelo gastoCriado = gastoServico.cadastrar(
                gasto.getDescricao(),
                gasto.getValor(),
                gasto.getCategoria().getId(),
                gasto.getFatura().getId()
            );
            gastoServico.gravarInformacoes(gasto);

            return new ResponseEntity<>("Gasto cadastrado com sucesso. ID: " + gastoCriado.getId(), HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>("Erro ao cadastrar o gasto: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<?> listarGastos() {
        try {
            return new ResponseEntity<>(gastoServico.listar(), HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>("Erro ao listar os gastos: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
}
