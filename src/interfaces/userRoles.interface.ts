export interface UserRole {
    userId: string;
    roleId: string;
}


export interface userRolesRepository {
    assignRoleToUser(input: UserRole): Promise<UserRole>;
    removeRoleFromUser(userId: string, roleId: string): Promise<boolean>;
    getUserRoles(userId: string): Promise<string[]>; // Retorna os IDs dos papéis atribuídos a um usuário
}