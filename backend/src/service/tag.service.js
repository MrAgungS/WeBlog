import { AppError } from '../errors/AppError.js';
import prisma from '../lib/prisma.js';
import { generateSlug } from '../utils/slug.js';

export const createTagService = async (name) => {
    try {
        if (!name) {
            throw new AppError("Tag name is required", 400);
        }
        const slug = generateSlug(name);
        const exist = await prisma.tag.findUnique({
            where: { slug }
        });
        if (exist) {
            throw new AppError("Tag already exists", 409);
        }
        return prisma.tag.create({
            data: { name, slug },
            select: {
                id: true,
                name: true,
                slug: true,
            }
        });
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        console.error("Create Tag Service Error:", error);
        throw new AppError(error.message || "Failed to create tag", 500);
    }
}
export const getTagService = async () => {
    try {
        return prisma.tag.findMany({
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
        console.error("Get Tag Service Error:", error);
        throw new AppError(error.message || "Failed to get tags", 500);
    }
}