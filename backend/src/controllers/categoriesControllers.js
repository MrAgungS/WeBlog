import response from "../res/responses.js";
import { categoriesService, createCategoryService } from "../service/categories.service.js";

export const createCategories = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await createCategoryService(name);
        return response(201, "Category created", category, res);
    } catch (error) {
        console.error("Create categories error: ", error);
        return response(error.status || 500, error.massage || "Server Create categories error ", null, res);
    }

};

export const getCategories = async (req, res) => {
    try {
        const categories = await categoriesService();
        return response(201,"Get categories success", categories, res)
    } catch (error) {
        console.error("Get categories error: ", error);
        return response(error.status || 500, error.massage || "Server Get categories error ", null, res);
    }
}