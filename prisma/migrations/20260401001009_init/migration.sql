-- CreateTable
CREATE TABLE "tb_roles" (
    "id_role" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_role" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "tb_usuarios" (
    "id_usuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_usuario" TEXT NOT NULL,
    "email_usuario" TEXT NOT NULL,
    "senha_usuario" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UsuarioRoles" (
    "id_usuario" INTEGER NOT NULL,
    "id_role" INTEGER NOT NULL,

    PRIMARY KEY ("id_usuario", "id_role"),
    CONSTRAINT "UsuarioRoles_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "tb_usuarios" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UsuarioRoles_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "tb_roles" ("id_role") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tb_contatos" (
    "id_contato" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_contato" TEXT NOT NULL,
    "email_contato" TEXT NOT NULL,
    "telefone_contato" TEXT NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    CONSTRAINT "tb_contatos_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "tb_usuarios" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_usuarios_email_usuario_key" ON "tb_usuarios"("email_usuario");
