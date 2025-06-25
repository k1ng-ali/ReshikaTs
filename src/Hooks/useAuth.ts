import { useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {loginUser, logoutUser, registerUser, getCurrentUser, getPosts, createPost, createAnswer} from "../Api/auth.ts";

export const useRegister = () =>
    useMutation({mutationFn: registerUser});

export const useLogin = () =>
    useMutation({mutationFn: loginUser});

export const useLogout = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            queryClient.removeQueries({queryKey: ['me']});
        }
    })
}

export const useCurrentUser = () => {
     return useQuery({
        queryKey: ['me'],
        queryFn: getCurrentUser,
        retry: false,
    })
};

export const useCreateAnswer = () => {
    return useMutation({ mutationFn: createAnswer });
};

export const useCreatePosts = () => {
    return useMutation({ mutationFn: createPost });
};

export const useGetPosts = (limit: number, offset: number) => {
    return useQuery({
        queryKey: ['posts', limit, offset],
        queryFn: () => getPosts(limit, offset),
    });
};