-- Script para tabela clientes

CREATE TABLE clientes (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    username NVARCHAR(50) UNIQUE NOT NULL,
    email NVARCHAR(100) UNIQUE NOT NULL,
    password NVARCHAR(255) NOT NULL,
    full_name NVARCHAR(100),
    telefone NVARCHAR(20),
    created_at DATETIME2 DEFAULT GETDATE()
);

-- Dados de teste
INSERT INTO clientes (username, email, password, full_name, telefone) VALUES
('joao123', 'joao@email.com', '123456', 'João Silva', '(11) 98765-4321'),
('maria456', 'maria@email.com', '123456', 'Maria Santos', '(21) 99876-5432'),
('pedro789', 'pedro@email.com', '123456', 'Pedro Costa', '(31) 97654-3210');