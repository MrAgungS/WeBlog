import response from "../res/responses.js";
import { categoriesService, createCategoryService } from "../service/categories.service.js";

export const createCategories = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await createCategoryService(name);
        return response(201, "Category created", category, res);
    } catch (error) {
        console.error("Create categories error: ", error);
        const statusCode = error?.status || error?.statusCode || 500;
        const message = error?.message || "Server Create categories error";
        return response(statusCode, message, null, res);
    }
};
export const getCategories = async (req, res) => {
    try {
        const categories = await categoriesService();
        return response(200,"Get categories success", categories, res)
    } catch (error) {
        console.error("Get categories error: ", error);
        const statusCode = error?.status || error?.statusCode || 500;
        const message = error?.message || "Server Get categories error";
        return response(statusCode, message, null, res);
    }
}