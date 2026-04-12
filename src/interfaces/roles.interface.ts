// TODO: será necessario criar role repository e ligação com o usuario para atribuição de roles

export interface Role {
    id: string;
    name: string;
}

export interface CreateRoleInput {
    name: string;
}

export interface RoleRepository {
    create(role: CreateRoleInput): Promise<Role>;
    findByName(name: string): Promise<Role | null>; // Método para encontrar um papel por nome, que é dado único
    delete(name: string): Promise<void>;
}