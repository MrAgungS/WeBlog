import response from "../res/responses.js";
import { createTagService, getTagService } from "../service/tag.service.js"

export const createTag = async (req, res) => {
    try {
        const { name } = req.body;
        const tag = await createTagService(name);
        return response(201, "Tag created successfully", tag, res);
    } catch (error) {
        console.error("Create tag error:", error);
        return response(
            error.status || 500,
            error.message || "Server create tag error",
            null,
            res
        );
    }
};
export const getTag = async (req, res) => {
    try {
        const tags = await getTagService();
        return response(201,"success get tags", tags, res)
    } catch (error) {
        console.error("Get tags error: ", error);
        return response(error.status || 500, error.massage || "Server get tags error ", null, res);
    }
};