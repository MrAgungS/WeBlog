import { error } from 'node:console';
import slugify from 'slugify';


export const generateSlug = (title) =>{
    const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    const slug = slugify(title, {
        lower: true,
        strict:true,
        trim:true
    });
    if (!SLUG_REGEX.test(slug)) {
        throw new error("Slug Invalid")
    };
    return slug;
}