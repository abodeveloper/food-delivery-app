import api from "@/lib/axios";

interface SignInResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

interface SignUpResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

interface SignInRequest {
  username: string;
  password: string;
}

interface SignUpRequest {
  email: string;
  password: string;
  name: string;
}

const authService = {
  signIn: async (data: SignInRequest): Promise<SignInResponse> => {
    const response = await api.post<SignInResponse>("/auth/login", data);
    return response.data;
  },

  signUp: async (data: SignUpRequest): Promise<SignUpResponse> => {
    const response = await api.post<SignUpResponse>("/auth/signup", data);
    return response.data;
  },
};

export default authService;
