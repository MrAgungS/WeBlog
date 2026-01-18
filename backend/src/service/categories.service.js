import { AppError } from '../errors/AppError.js';
import prisma from '../lib/prisma.js';
import { generateSlug } from '../utils/slug.js';


export const createCategoryService = async (name) => {
    if (!name) {
        throw new AppError("Category name is required", 400);
    }
    const slug = generateSlug(name);
    const exist = await prisma.category.findUnique({
        where: { slug }
    });
    if (exist) {
        throw new AppError("Category already exists", 409);
    }
    return prisma.category.create({
        data: { name, slug }
    });
};
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