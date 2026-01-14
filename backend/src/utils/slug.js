import { error } from 'node:console';
import slugify from 'slugify';

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const generateSlug = (title) =>{
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