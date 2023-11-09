package com.api.backend.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.backend.modelo.UsuarioModelo;
import com.api.backend.repositorio.UsuarioRepositorio;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/usuarios")

public class UsuarioControle {
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    //login
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UsuarioModelo usuario) {
        UsuarioModelo usuarioExistente = usuarioRepositorio.findByEmail(usuario.getEmail());

        if (usuarioExistente != null && usuarioExistente.getSenha().equals(usuario.getSenha())) {
            return new ResponseEntity<>("Login bem-sucedido!", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Credenciais inválidas", HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrarUsuario(@RequestBody UsuarioModelo usuario) {
        // Verificar se o e-mail já está em uso
        if (usuarioRepositorio.findByEmail(usuario.getEmail()) != null) {
            return new ResponseEntity<>("E-mail já está em uso", HttpStatus.BAD_REQUEST);
        }

        // Salvando o novo usuário no banco de dados
        usuarioRepositorio.save(usuario);

        return new ResponseEntity<>("Usuário cadastrado com sucesso!", HttpStatus.OK);
    }
}
