export interface User {
    id: number;
    name: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
    // role?: string;
}

// Dados de entrada para criar um usuário, com o nome do papel opcional
export interface CreateUserInput {
    name: string;
    email: string;
    // roleName?: string;
}

// Como sera armazenado no banco de dados, com a referência para o id do papel
export interface CreateUserData {
    name: string;
    email: string;
    // roleId?: string;
}

export interface UpdateUserInput {
    name: string;
}

export interface userRepository {
    create(user: CreateUserInput): Promise<User>;
    findByEmail(email:string): Promise<User | null>; // Método para encontrar um usuário por email, que é dado único
    update(email: string, user: UpdateUserInput): Promise<User>;
    delete(email: string): Promise<boolean>;
}