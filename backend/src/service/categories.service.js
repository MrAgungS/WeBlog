import { AppError } from '../errors/AppError.js';
import prisma from '../lib/prisma.js';
import { generateSlug } from '../utils/slug.js';


export const createCategoryService = async (name) => {
    try {
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
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        console.error("Create Category Service Error:", error);
        throw new AppError(error.message || "Failed to create category", 500);
    }
};
export const categoriesService = async () => {
    try {
        return prisma.category.findMany({
            select:{
                id:true,
                name:true,
                slug:true,
            },
            orderBy:{
                name:"asc"
            }
        });
    } catch (error) {
        console.error("Get Categories Service Error:", error);
        throw new AppError(error.message || "Failed to get categories", 500);
    }
}