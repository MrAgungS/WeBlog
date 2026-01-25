import api from "@/lib/axiosInstance"

interface CreateTagsDTO {
    name: string,
}
export const getTag = async () => {
    return api.get(`/tag/get/`)
}
export const createTag = async (payload:CreateTagsDTO) => {
    return api.post(`/tag/create/`, payload)
}