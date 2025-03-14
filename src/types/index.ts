export interface RegisterData {
  account: {
    email: string;
    password: string;
    repeatPassword: string;
  };
  personal: {
    firstName: string;
    lastName: string;
    phone: string;
  };
  salon: {
    name: string;
  };
}

export interface User {
  id: string;
  email: string;
  role: "Owner" | "Staff";
  fullName: string;
}

export interface ApiErrorResponse {
  title: string;
}

export interface LoginResponse {
  token: string;
  tokenExpired: number;
  refreshToken: string;
}
