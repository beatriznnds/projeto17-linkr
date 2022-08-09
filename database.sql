-- Criação do banco de Dados
CREATE DATABASE "Linkr"

--Criação da Tabela sessions
CREATE TABLE "sessions"(
    id SERIAL PRIMARY KEY,
    token TEXT NOT NULL UNIQUE,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW()
)
