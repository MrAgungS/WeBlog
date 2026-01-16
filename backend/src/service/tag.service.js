// import { AppError } from '../errors/AppError.js';
import prisma from '../lib/prisma.js';

export const getTagService = async () => {
    return prisma.tag.findMany({
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