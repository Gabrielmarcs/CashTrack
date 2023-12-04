package com.api.backend.modelo;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Component
@Getter
@Setter
public class RespostaModelo {
    private String mensagem;

    public RespostaModelo(String mensagem) {
        this.mensagem = mensagem;
    }
        public RespostaModelo() {
    }
}