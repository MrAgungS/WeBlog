import { AppError } from '../errors/AppError.js';
import prisma from '../lib/prisma.js';
import { generateSlug } from '../utils/slug.js';

export const getPostService = async ( slug ) => {
    try {
        if (!slug) {
            throw new AppError("Slug is reqiured", 400)
        }
        // Find post by slug (allow DRAFT and PUBLISHED, not ARCHIVED)
        const post = await prisma.post.findFirst({
            where: { 
                slug,
                status: { in: ["DRAFT", "PUBLISHED"] }
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                category: {
                    select: {
                        id: true,
                        name: true,
                        slug: true
                    }
                },
                tags: {
                    include: {
                        tag: {
                            select: {
                                id: true,
                                name: true,
                                slug: true
                            }
                        }
                    }
                },
                likes: {
                    select: { user_id: true }
                },
                comments: {
                    select: { id: true }
                }
            }
        });
        // Handle post not found
        if (!post) {
            throw new AppError("Post not Found", 404);
        };
        const { likes, comments, ...postData } = post;
        return {
            ...postData,
            likes: likes.length,
            commentsCount: comments.length,
            isLiked: false
        };
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        console.error("Get Post Service Error:", error);
        throw new AppError(error.message || "Failed to get post", 500);
    }
}
export const FindAllPosts = async () =>{
    try {
        const posts = await prisma.post.findMany({
            where: { status: { not: "ARCHIVED" } },
            orderBy:{ createdAt:"desc"},
            include:{
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                category:{
                    select:{
                        name:true,
                        slug:true
                    }
                },
                tags:{
                    include: {
                        tag: {
                            select:{
                                id:true,
                                name:true,
                                slug:true
                            }
                        }
                    }
                },
                likes: {
                    select: { user_id: true }
                },
                comments: {
                    select: { id: true }
                }
            }
        });
        // Map to include likes and comments count
        return posts.map(({ likes, comments, ...post }) => ({
            ...post,
            likes: likes.length,
            commentsCount: comments.length,
            isLiked: false // Frontend will check current user
        }));
    } catch (error) {
        console.error("Find All Posts Service Error:", error);
        throw new AppError(error.message || "Failed to get posts", 500);
    }
}
export const createPostService = async (title, content, userId) => {
    try {
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
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        console.error("Create Post Service Error:", error);
        throw new AppError(error.message || "Failed to create post", 500);
    }
}
export const getPostByIdService = async (id) => {
    try {
        if (!id) {
            throw new AppError("Post id is reqiured", 400)
        }
        //Find post find id
        const post = await prisma.post.findFirst({
            where: { 
                id, 
                status: { not:"ARCHIVED" }
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                category: {
                    select: {
                        id: true,
                        name: true,
                        slug: true
                    }
                },
                tags: {
                    include: {
                        tag: {
                            select: {
                                id: true,
                                name: true,
                                slug: true
                            }
                        }
                    }
                },
                likes: {
                    select: { user_id: true }
                },
                comments: {
                    select: { id: true }
                }
            }
        });
        //Handle get id not found
        if (!post) {
            throw new AppError("Post id not found", 404)
        };
        const { likes, comments, ...postData } = post;
        // Map to include likes and comments count
        return {
            ...postData,
            likes: likes.length,
            commentsCount: comments.length,
            isLiked: false
        };
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        console.error("Get Post By Id Service Error:", error);
        throw new AppError(error.message || "Failed to get post", 500);
    }
}
export const updatePostService = async (id, title, content, status) => {
    try {
        //Check by id
        if (!id) {
            throw new AppError("Post id not found", 400);
        }
        // Check if at least title or content is provided
        if (!title && !content && !status) {
            throw new AppError("Title, content, or status must be provided", 400);
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

                // If no exist or exist but same post, break
                if(!exist || exist.id === id) break;

                newSlug=`${baseSlug}-${counter++}`;
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
                ...(status && { status }),
            },
            select:{
                id: true,
                title: true,
                slug: true,
                excerpt: true,
                status: true,
            }
        })
        return post;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        console.error("Update Post Service Error:", error);
        throw new AppError(error.message || "Failed to update post", 500);
    }
}
export const deletePostService = async (id) => {
    try {
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
        });
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        console.error("Delete Post Service Error:", error);
        throw new AppError(error.message || "Failed to delete post", 500);
    }
}