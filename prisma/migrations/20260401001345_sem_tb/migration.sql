/*
  Warnings:

  - You are about to drop the `tb_contatos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_usuarios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "tb_usuarios_email_usuario_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "tb_contatos";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "tb_roles";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "tb_usuarios";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "roles" (
    "id_role" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_role" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id_usuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_usuario" TEXT NOT NULL,
    "email_usuario" TEXT NOT NULL,
    "senha_usuario" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "contatos" (
    "id_contato" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_contato" TEXT NOT NULL,
    "email_contato" TEXT NOT NULL,
    "telefone_contato" TEXT NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    CONSTRAINT "contatos_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UsuarioRoles" (
    "id_usuario" INTEGER NOT NULL,
    "id_role" INTEGER NOT NULL,

    PRIMARY KEY ("id_usuario", "id_role"),
    CONSTRAINT "UsuarioRoles_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UsuarioRoles_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "roles" ("id_role") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UsuarioRoles" ("id_role", "id_usuario") SELECT "id_role", "id_usuario" FROM "UsuarioRoles";
DROP TABLE "UsuarioRoles";
ALTER TABLE "new_UsuarioRoles" RENAME TO "UsuarioRoles";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_usuario_key" ON "usuarios"("email_usuario");
