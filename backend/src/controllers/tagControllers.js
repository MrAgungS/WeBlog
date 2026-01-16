import response from "../res/responses.js";
import { getTagService } from "../service/tag.service.js"

export const getTag = async (req, res) => {
    try {
        const tags = await getTagService();
        return response(201,"success get tags", tags, res)
    } catch (error) {
        console.error("Get tags error: ");
        return response(error.status || 500, error.massage || "Server get tags error ", null, res);
    }
}