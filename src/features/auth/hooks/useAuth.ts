"use client";

import useCookie from "@/hooks/useCookie";
import authService from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store";
import { SignInFormData, SignUpFormData, User } from "../types";

interface AuthResponse {
  access_token: string;
  user: User;
}

export function useAuth() {
  const { user, login, logout } = useAuthStore();
  const { setCookie, removeCookie } = useCookie();
  const router = useRouter();

  const signInMutation = useMutation({
    mutationFn: authService.signIn,
    onSuccess: (data: AuthResponse) => {
      login(data.user);
      setCookie("authToken", data.access_token);
      router.push("/");
    },
    onError: (error: any) => {
      console.error("Sign In Error:", error.message);
    },
  });

  const signUpMutation = useMutation({
    mutationFn: authService.signUp,
    onSuccess: (data: AuthResponse) => {
      login(data.user);
      setCookie("authToken", data.access_token);
      router.push("/");
    },
    onError: (error: any) => {
      console.error("Sign Up Error:", error.message);
    },
  });

  const handleSignIn = (data: SignInFormData) => {
    signInMutation.mutate(data);
  };

  const handleSignUp = (data: SignUpFormData) => {
    signUpMutation.mutate(data);
  };

  const handleLogout = () => {
    logout();
    removeCookie("authToken");
    router.push("/sign-in");
  };

  return {
    user,
    handleSignIn,
    handleSignUp,
    handleLogout,
    signInLoading: signInMutation.isPending,
    signInError: signInMutation.error,
    signUpLoading: signUpMutation.isPending,
    signUpError: signUpMutation.error,
  };
}
