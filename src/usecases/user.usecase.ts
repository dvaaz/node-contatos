import type { User, CreateUserInput, UpdateUserInput, userRepository } from '../interfaces/users.interface.js';

export class UserUseCase {
    private userRepository: userRepository;

    constructor(userRepository: userRepository) {
        this.userRepository = userRepository;
        // TODO: injetar o userRolesRepository para lidar com as atribuições de papéis
    }

    // criar usuário
    async createUser(input: CreateUserInput): Promise<User> {
        const existingUser = await this.userRepository.findByEmail(input.email);
        if (existingUser) {
            throw new Error('Email ja registrado');
        }
        return await this.userRepository.create(input);
    }

    // atualizar usuário
    async updateUser(email: string, input: UpdateUserInput): Promise<User> {
        const existingUser = await this.userRepository.findByEmail(email);
        if (!existingUser) {
            throw new Error('Usuario nao encontrado');
        }
        return await this.userRepository.update(email, input);
    }

    // deletar usuário
    async deleteUser(email: string): Promise<boolean> {
        const existingUser = await this.userRepository.findByEmail(email);
        if (!existingUser) {
            throw new Error ('Usuario nao encontrado');
        }
        return await this.userRepository.delete(email);
    }
}