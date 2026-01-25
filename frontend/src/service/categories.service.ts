import api from "@/lib/axiosInstance"

interface CreateCategoryDTO {
    name: string;
}
export const getCategories = async () => {
    return api.get(`/categories/get/`)
}
export const createCategories = async (payload:CreateCategoryDTO) => {
    return api.post(`/categories/create/`, payload)
}