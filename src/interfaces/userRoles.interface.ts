export interface UserRole {
    userId: number;
    roleId: string;
}


export interface userRolesRepository {
    assignRoleToUser(input: UserRole): Promise<UserRole>;
    removeRoleFromUser(userId: number, roleId: string): Promise<boolean>;
    getUserRoles(userId: number): Promise<string[]>; // Retorna os IDs dos papéis atribuídos a um usuário
}