import api from "@/lib/axiosInstance"

interface CreateCategoryDTO {
    name: string;
}
export const getCategories = async () => {
    return api.get(`/api/categories/get/`)
}
export const createCategories = async (payload:CreateCategoryDTO) => {
    return api.post(`/api/categories/create/`, payload)
}