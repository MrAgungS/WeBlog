import { AppError } from '../errors/AppError.js';
import prisma from '../lib/prisma.js';
import { generateSlug } from '../utils/slug.js';

export const getPostService = async ( slug ) => {
    if (!slug) {
        throw new AppError("Slug is reqiured", 400)
    }
    // Find post by slug
    const post = await prisma.post.findFirst({
        where: { 
            slug,
            status: { not: "ARCHIVED"}
         },
        select: { id:true }
    });
    // Handle post not found
    if (!post) {
        throw new AppError("Post not Found", 404);
    };
    return post;
}
export const FindAllPosts = async () =>{
    return prisma.post.findMany({
        orderBy:{ createdAt:"desc"},
        include:{
            category:{
                select:{
                    name:true,
                    slug:true
                }
            },
            tags:{
                select:{
                    id:true,
                    name:true,
                    slug:true
                }
            }
        }
    })
}
export const createPostService = async (title, content, userId) => {
    // Check title && content
    if (!title || !content) {
        throw new AppError("Title and content are required", 400)
    }
    if (!userId) {
        throw new AppError("Unauthorized", 401);
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
            user_id: userId,
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
export const getPostByIdService = async (id) => {
    if (!id) {
        throw new AppError("Post id is reqiured", 400)
    }
    //Find post find id
    const post = await prisma.post.findFirst({
        where: { 
            id, 
            status: { not:"ARCHIVED" }
        },
    });
    //Handle get id not found
    if (!post) {
        throw new AppError("Post id not found", 404)
    };
    return post
}
export const updatePostService = async (id, title, content) => {
    //Check by id
    if (!id) {
        throw new AppError("Post id not found", 400);
    }
    //get existing post
    const existingPost = await prisma.post.findUnique({
        where:{ id },
        select:{
            title: true,
            slug: true,
            content: true,
            status: true,
        },
    });
    //check existing post
    if (!existingPost || existingPost.status === "ARCHIVED") {
        throw new AppError("Post not found", 404);
    }
    let slug = existingPost.slug;
    // regenerate slug only if title change
    if (title && title !== existingPost.title) {
        // Generate initial slug from the title
        const baseSlug = generateSlug(title);
        let newSlug = baseSlug;
        let counter = 1;
        // Check slug uniqueness and append a counter if it already exists
        while(true){
            const exist = await prisma.post.findUnique({
                where: { slug:newSlug },
                select: { id:true }
            });

            if(!exist) break;

            slug=`${baseSlug}-${counter++}`;
        };
        slug = newSlug;
    }
    // Generate excerpt if content changed
    const updateContent = content ?? existingPost.content;
    const excerpt = updateContent.length > 150 ? updateContent.substring(0,150)+ "...":updateContent;
    // Update post 
    const post = await prisma.post.update({
        where: { id },
        data: {
            title: title ?? existingPost.title,
            content: updateContent,
            slug,
            excerpt, 
        },
        select:{
            id: true,
            title: true,
            slug: true,
            excerpt: true,
            status: true,
        }
    })
    return post
}
export const deletePostService = async (id) => {
    // This implementation uses a soft delete strategy and is highly recommended.
    // DO NOT replace it with a hard delete.
    //Check by id
    if (!id) {
        throw new AppError("Post ID is reguired", 400);
    };
    // find post id
    const post = await prisma.post.findUnique({
        where:{ id },
        select:{ id:true, status: true }
    });
    // check error  
    if (!post) {
        throw new AppError("Post Not Found", 404);
    }; 
    if (post.status === "ARCHIVED") {
        throw new AppError("Post already ARCHIVED", 400)
    }
    return prisma.post.update({
        where:{ id },
        data: {
            status: "ARCHIVED",
        }
    })
}