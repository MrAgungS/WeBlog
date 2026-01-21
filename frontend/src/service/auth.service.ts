import api from "@/lib/axiosInstance"

export const register = async (payload: string) => {
    return api.post("/api/auth/register", payload)
}
export const login = async (payload: string) => {
    return api.post("/api/auth/login", payload)
}
export const refresh = async (payload: string) => {
    return api.post("/api/auth/refresh", payload)
}
export const logout = async (payload: string) => {
    return api.post("/api/auth/logout", payload)
}
