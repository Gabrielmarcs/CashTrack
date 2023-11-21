package com.api.backend.controle;

import com.api.backend.modelo.GastoModelo;
import com.api.backend.servico.GastoServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/gastos")
public class GastoControle {

    private final GastoServico gastoService;

    @Autowired
    public GastoControle(GastoServico gastoService) {
        this.gastoService = gastoService;
    }

    @PostMapping
    public ResponseEntity<GastoModelo> addGasto(@RequestBody GastoModelo gasto) {
        return ResponseEntity.ok(gastoService.addGasto(gasto));
    }

    @GetMapping
    public ResponseEntity<List<GastoModelo>> listarTodosGastos() {
        return ResponseEntity.ok(gastoService.listarTodosGastos());
    }

    @PutMapping("/{id}")
    public ResponseEntity<GastoModelo> updateGasto(@PathVariable Long id, @RequestBody GastoModelo gastoAtualizado) {
        return ResponseEntity.ok(gastoService.updateGasto(id, gastoAtualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteGasto(@PathVariable Long id) {
        gastoService.deleteGasto(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<GastoModelo> detalharGasto(@PathVariable Long id) {
    Optional<GastoModelo> gasto = gastoService.detalharGasto(id);
        return gasto.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
