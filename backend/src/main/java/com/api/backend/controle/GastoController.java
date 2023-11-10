package com.api.backend.controle;

import com.api.backend.modelo.GastoModelo;
import com.api.backend.servico.GastoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/gastos")
public class GastoController {

    private final GastoService gastoService;

    @Autowired
    public GastoController(GastoService gastoService) {
        this.gastoService = gastoService;
    }

    @PostMapping
    public ResponseEntity<GastoModelo> adicionarGasto(@RequestBody GastoModelo gasto) {
        return ResponseEntity.ok(gastoService.adicionarGasto(gasto));
    }

    @GetMapping
    public ResponseEntity<List<GastoModelo>> listarTodosGastos() {
        return ResponseEntity.ok(gastoService.listarTodosGastos());
    }

    @PutMapping("/{id}")
    public ResponseEntity<GastoModelo> editarGasto(@PathVariable Long id, @RequestBody GastoModelo gastoAtualizado) {
        return ResponseEntity.ok(gastoService.editarGasto(id, gastoAtualizado));
    }
}
