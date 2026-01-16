import { AppError } from '../errors/AppError.js';
import prisma from '../lib/prisma.js';

export const categoriesService = async () => {
    return prisma.category.findMany({
        select:{
            id:true,
            name:true,
            slug:true,
        },
        orderBy:{
            name:"asc"
        }
    })
}