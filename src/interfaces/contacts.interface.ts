export interface Contact {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    userId?: string;
    // Campos opcionais para controle de criação e atualização, são definidos no backend mas podem ser solicitados pelo front
    createdAt?: Date;
    updatedAt?: Date;
}

// Entradade dados para criar um contato, com a referência para o email do usuário dono do contato
export interface CreateContactInput {
    nome: string;
    email: string;
    telefone: string;
    userEmail: string; // Referência para o usuário dono do contato no input
}

// Dados de entrada para criar um contato no db, com a referência para o id do usuário dono do contato
export interface CreateContactData {
    nome: string;
    email: string;
    telefone: string;
    userId: string; // Referência para o usuário dono do contato no banco de dados
}

export interface UpdateContactInput {
    nome?: string;
    email?: string;
    telefone?: string;
}

export interface contactRepository {
    create(contact: CreateContactData): Promise<Contact>;
    findAllByUser(userId: string): Promise<Contact[]>;
    update(id: string, contact: UpdateContactInput): Promise<Contact>;
    delete(id: string): Promise<boolean>;
}