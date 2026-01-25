import api from "@/lib/axiosInstance"

export interface LoginDTO{
  email: string,
  password: string
}
export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}
// Helper function to store tokens
const storeTokens = (accessToken: string, refreshToken?: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', accessToken);
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  }
};
// Helper function to clear tokens
export const clearTokens = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
};
export const register = async (payload: RegisterDTO) => {
  const res = await api.post("/auth/register", payload);
  const { accessToken, refreshToken } = res.data.data || res.data;
  if (accessToken) {
    storeTokens(accessToken, refreshToken);
  }
  return res.data;
};
export const login = async (payload: LoginDTO) => {
  const res = await api.post("/auth/login", payload);
  const { accessToken } = res.data.data || res.data;
  if (accessToken) {
    storeTokens(accessToken);
  }
  return res.data;
};
export const refresh = async () => {
  const res = await api.post("/auth/refresh");
  const { accessToken } = res.data.data || res.data;
  if (accessToken) {
    storeTokens(accessToken);
  }
  return res.data;
};
export const logout = async () => {
  try {
    const res = await api.post("/auth/logout");
    return res.data;
  } finally {
    clearTokens();
  }
};