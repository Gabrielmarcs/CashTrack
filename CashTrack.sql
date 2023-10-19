-- Tabela Usuario
CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY,
    nome VARCHAR(45),
    email VARCHAR(45),
    senha VARCHAR(45)
);

-- Tabela Renda
CREATE TABLE Renda (
    idRenda INT PRIMARY KEY,
    descricao VARCHAR(45),
    saldo DECIMAL(10,2),
    idUsuario INT,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);

