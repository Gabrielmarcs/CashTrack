package com.api.backend.controle;

import com.api.backend.modelo.GastoModelo;
import com.api.backend.repositorio.UsuarioRepositorio;
import com.api.backend.servico.GastoServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/gasto")
@CrossOrigin(origins = "*")
public class GastoControle {

    private final GastoServico gastoService;
    
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Autowired
    public GastoControle(GastoServico gastoService) {
        this.gastoService = gastoService;
    }


    @PostMapping("/cadastrar") 
    public GastoModelo cadastrarGasto(@RequestBody GastoModelo gasto) {
        Long idCategoria = gasto.getCategoria().getId();
        Long idFatura = gasto.getFatura().getId();
        return gastoService.addGasto(gasto, idCategoria, idFatura);
    }

    @GetMapping
    public ResponseEntity<List<GastoModelo>> listarTodosGastos() {
        return ResponseEntity.ok(gastoService.listarTodosGastos());
    }

    @PutMapping("atualizar/{id}")
    public ResponseEntity<GastoModelo> updateGasto(@PathVariable Long id, @RequestBody GastoModelo gastoAtualizado) {
        return ResponseEntity.ok(gastoService.updateGasto(id, gastoAtualizado));
    }

    @DeleteMapping("deletar/{id}")
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
