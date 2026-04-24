import type { Contact, CreateContactInput, UpdateContactInput, contactRepository } from "../interfaces/contacts.interface.js";
import type { userRepository } from "../interfaces/users.interface.js";

export class ContactUseCase {
    private contactRepository: contactRepository;
    private userRepository: userRepository;

    constructor(contactRepository: contactRepository, userRepository: userRepository) {
        this.contactRepository = contactRepository;
        this.userRepository = userRepository;
    }

    // Inicio dos metodos
    async createContact(input: CreateContactInput): Promise<Contact> {
        const user = await this.userRepository.findByEmail(input.userEmail);
        if (!user) {
            throw new Error('Usuario nao encontrado para associar o contato');
        }
        const newContact = await this.contactRepository.create({
            nome: input.nome,
            email: input.email,
            telefone: input.telefone,
            userId: user.id, // Associa o contato ao usuário encontrado
        });
        return newContact;
    }

    async showAllContactsByUserEmail(userEmail: string): Promise<Contact[]> {
        const user = await this.userRepository.findByEmail(userEmail);
        if (!user) {
            throw new Error('Usuario nao encontrado para buscar contatos');
        }
        return await this.contactRepository.findAllByUser(user.id);
    }

    async updateContact(id: string, input: Partial<UpdateContactInput>): Promise<Contact> {
        const existingContact = await this.contactRepository.update(id, input);
        if (!existingContact) {
            throw new Error('Contato nao encontrado para atualizar');
        }
        return existingContact;

    }

    async deleteContact(id: string): Promise<boolean> {
        const existingContact = await this.contactRepository.delete(id);
        if (!existingContact) {
            throw new Error('Contato nao encontrado para deletar');
        }
        return existingContact;
    }
}