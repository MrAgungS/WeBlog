import { AppError } from '../errors/AppError.js';
import prisma from '../lib/prisma.js';
import generateSlug from '../utils/slug.js';

export const getPostService = async ( slug ) => {
    // Find post by slug
    const getSlug = await prisma.post.findUnique({
        where: { slug },
        select: { id:true }
    });
    // Handle post not found
    if (!getSlug) {
        throw new AppError("Post not Found", 404);
    };
    return getSlug;
}
export const createPostService = async (title, content) => {
    // Check title && content
    if (!title || !content) {
        throw new AppError("Title and content are required", 400)
    }
    // Generate initial slug from the title
    const baseSlug = generateSlug(title);
    let slug = baseSlug;
    let counter = 1;
    // Check slug uniqueness and append a counter if it already exists
    while(true){
        const exist = await prisma.post.findUnique({
            where: { slug },
            select: { id:true }
        });

        if(!exist) break;

        slug=`${baseSlug}-${counter}`;
        counter++;
    };
    // Generate post excerpt (first 150 characters)
    const excerpt = content.length > 150 ? content.substring(0,150)+ "...":content;
    // Generate post excerpt (first 150 characters)
    const post = await prisma.post.create({
        data: {
            title,
            content, 
            slug,
            excerpt,
        },
        select:{
            id:true,
            content:true,
            slug:true,
            excerpt:true,
            status:true,
        },
    });
    return post;
}
export const getPostByIdService = async () => {
    
}
export const updatePostService = async () => {
    
}
export const deletePostService = async () => {
    
}