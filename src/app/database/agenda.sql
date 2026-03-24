-- Banco de Dados de contato

CREATE DATABASE IF NOT EXISTS db_agenda
DEFAULT CHARACTER SET utf8
COLLATE utf8_general_ci;

-- Tabelas do banco de dados
-- Tabela de usuários
CREATE TABLE IF NOT EXISTS `db_agenda`.`tb_usuarios` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nome_usuario` VARCHAR(150) NOT NULL,
  `email_usuario` VARCHAR(150) NOT NULL,
  `senha_usuario` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE (`email_usuario`)
);

-- Tabela de contatos
CREATE TABLE IF NOT EXISTS `db_agenda`.`tb_contatos` (
  `id_contato` INT NOT NULL AUTO_INCREMENT,
  `nome_contato` VARCHAR(100) NOT NULL,
  `telefone_contato` VARCHAR(12) NULL,
  `celular_contato` VARCHAR(12) NULL,
  `email_contato` VARCHAR(45) NULL,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_contato`),
  CONSTRAINT `fk_contatos_usuarios`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `db_agenda`.`tb_usuarios` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- Tabela de Roles 
CREATE TABLE IF NOT EXISTS `db_agenda`.`tb_roles` (
  `id_role` INT NOT NULL AUTO_INCREMENT,
  `nome_role` VARCHAR(45) NOT NULL, -- Ex: 'ROLE_ADMIN', 'ROLE_USER'
  PRIMARY KEY (`id_role`),
  UNIQUE (`nome_role`)
);


-- Tabela de relacionamento entre usuário e roles (n:n)
CREATE TABLE IF NOT EXISTS `db_agenda`.`tb_usuarios_roles` (
  `id_usuario` INT NOT NULL,
  `id_role` INT NOT NULL,
  PRIMARY KEY (`id_usuario`, `id_role`), 
  CONSTRAINT `fk_usuarios_roles_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `tb_usuarios` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_usuarios_roles_role`
    FOREIGN KEY (`id_role`)
    REFERENCES `tb_roles` (`id_role`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);