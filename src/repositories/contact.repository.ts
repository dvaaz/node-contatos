import { prisma} from "../database/prisma-client.js";
import type {Contact, CreateContactData, CreateContactInput, UpdateContactInput, contactRepository} from '../interfaces/contacts.interface.js';

export class ContactRepositoryPrisma implements contactRepository {
    async create(contact : CreateContactData): Promise <Contact> {
        return await prisma.contact.create({
            data: {
                nome: contact.nome,
                email: contact.email,
                telefone: contact.telefone,
                user: contact.userId
            },
        })
    }

    async findAllByUser(userId: number): Promise<Contact[]> {
        return await prisma.contact.findMany({
            where:{
                userId: userId
            }
        })
    }

    async update(id: number, contact: UpdateContactInput): Promise<Contact> {
        return await prisma.contact.update({
            where: {
                id: id
            },
            data: contact
        })
    }

    delete(id: number): Promise<boolean> {
        return prisma.contact.delete({
            where: {
                id: id
            }
        })
        .then(() => true)
        .catch(() => false);
    }

}