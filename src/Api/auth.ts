import { api } from "./axios.ts";
import type { RegisterData, LoginData, User } from "../Types/UserType.ts";
import type { newPost, newAnswer } from "../Types/ContentType.ts";

export const registerUser = async (data: RegisterData) => {
    const res = await api.post('/auth/register', data, {
        withCredentials: true
    });
    return res.data;
};

export const loginUser = async (data: LoginData) => {
    const res = await api.post('/auth/login', data, {
        withCredentials: true
    });
    return res.data;
};

export const logoutUser = async () => {  // Убрал параметр data
    const res = await api.post('/auth/logout', {}, {
        withCredentials: true
    });
    return res.data;
};

export const getCurrentUser = async (): Promise<User | null> => {
    try {
        const res = await api.get('/auth/me', {
            withCredentials: true
        });
        return res.data;
    } catch (e) {
        console.error(e);
        return null;
    }
};

export const getPosts = async (limit: number, offset: number) => {
    const res = await api.get('/posts', {
        withCredentials: true,
        params: {
            limit,
            offset
        }
    })
    return res.data;
}

export const createPost = async (data: newPost) => {
    const res = await api.post('/posts/create', data, {
        withCredentials: true
    });
    return res.data;
}

export const createAnswer = async (data: newAnswer) => {
    const res = await api.post('/answers/create', data, {
        withCredentials: true
    })
    return res.data;
}