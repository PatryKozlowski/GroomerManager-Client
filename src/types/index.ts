import { CreateEditClientSchema, filterClientSchema } from "@/schemas";
import { z } from "zod";
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

export interface Salon {
  id: string;
  logoPath: string;
  name: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  email: string;
  role: "Owner" | "Staff";
  fullName: string;
}

export interface ApiErrorResponse {
  title: string;
  code?: string;
  message?: string;
  details?: Record<string, unknown>;
}

export interface LoginResponse {
  token: string;
  tokenExpired: number;
  refreshToken: string;
}

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  salonId: string;
}

export interface Pet {
  id: string;
  name: string;
  breed: string;
  birthDate: string;
  weight: number;
  clientId: string;
  salonId: string;
  notes: PetNote[];
  createdAt: string;
  updatedAt: string;
}

export interface PetNote {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export type ClientFormData = z.output<typeof CreateEditClientSchema>;
export type FilterFormData = z.infer<typeof filterClientSchema>;
