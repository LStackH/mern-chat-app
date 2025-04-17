import axios from "axios";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const { data } = await axios.post<AuthResponse>(
    "/api/auth/login",
    credentials
  );
  return data;
};

export const register = async (details: RegisterData): Promise<void> => {
  await axios.post("/api/auth/register", details);
};
