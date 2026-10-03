import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

interface AuthState {
    token: string | null;
    setToken: (token: string) => void;
    logOut: () => void;
}

// persist saves the token to localStorage and only touches it in the browser, so this is SSR-safe
const useAuth = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            setToken: (token) => set({ token }),
            logOut: () => set({ token: null }),
        }),
        { name: 'auth-token' }
    )
)

// For fetch() calls to admin-only endpoints
export const authHeader = (): Record<string, string> => {
    const token = useAuth.getState().token;
    return token ? { Authorization: `Bearer ${token}` } : {};
}

// axios calls get the token automatically; a 401 means it expired, so log out
// (the admin layout then redirects to /login)
axios.interceptors.request.use((config) => {
    const token = useAuth.getState().token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axios.interceptors.response.use(undefined, (error) => {
    if (error.response?.status === 401) useAuth.getState().logOut();
    return Promise.reject(error);
});

export default useAuth;
