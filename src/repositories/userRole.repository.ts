// import { prisma } from "../database/prisma-client.js";
// import type { UserRole, userRolesRepository } from "../interfaces/userRoles.interface.js";


// export class UserRolesRepositoryPrisma implements userRolesRepository {
//     async assignRoleToUser(input: UserRole): Promise<UserRole> {
//         return await prisma.userRoles.create({
//             data: {
//                 userId: input.userId,
//                 roleId: input.roleId,
//             },
//         });
//     }

//     async removeRoleFromUser(userId: number, roleId: string): Promise<boolean> {
//         return await prisma.userRoles.deleteMany({
//             where: {
//                 userId: userId,
//                 roleId: roleId,
//             },
//         })
//         .then(() => true)
//         .catch(() => false);
//     }
    
//     async getUserRoles(userId: number): Promise<string[]> {
//         const userRoles = await prisma.userRoles.findMany({
//             where :{
//                 userId: userId,
//             },
//             select: {
//                 roleId: true,
//             },
//          })
//          return userRoles.map(ur: => ur.roleId); 
//         }

// }