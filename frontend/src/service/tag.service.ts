import api from "@/lib/axiosInstance"

interface CreateTagsDTO {
    name: string,
}
export const getTag = async () => {
    return api.get(`/api/tag/get/`)
}
export const createTag = async (payload:CreateTagsDTO) => {
    return api.post(`/api/tag/create/`, payload)
}