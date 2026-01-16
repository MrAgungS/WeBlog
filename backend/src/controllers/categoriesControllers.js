import response from "../res/responses.js";
import { categoriesService } from "../service/categories.service.js";

export const getCategories = async (req, res) => {
    try {
        const categories = await categoriesService();
        return response(201,"Get categories success")
    } catch (error) {
        console.error("Get categories error: ");
        return response(error.status || 500, error.massage || "Server Get categories error ", null, res);
    }
}