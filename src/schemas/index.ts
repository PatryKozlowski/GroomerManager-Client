import { z } from "zod";

export const LoginFromSchema = z.object({
  email: z
    .string()
    .email({
      message: "Podaj poprawny adres email",
    })
    .min(1, {
      message: "Adres email jest wymagan",
    }),
  password: z
    .string()
    .min(8, {
      message: "Hasło musi mieć minimum 8 znaków",
    })
    .regex(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/, {
      message: "Hasło musi zawierać małą i dużą literę oraz cyfrę",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Hasło musi zawierać znak specjalny",
    }),
});

export const RegisterStepperAccountSchema = z
  .object({
    email: z
      .string()
      .nonempty({
        message: "Adres email jest wymagany",
      })
      .email({
        message: "Podaj poprawny adres email",
      }),
    password: z
      .string()
      .nonempty({
        message: "Hasło jest wymagane",
      })
      .min(8, {
        message: "Hasło musi mieć minimum 8 znaków",
      })
      .regex(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/, {
        message: "Hasło musi zawierać małą i dużą literę oraz cyfrę",
      })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Hasło musi zawierać znak specjalny",
      }),
    repeatPassword: z
      .string()
      .nonempty({
        message: "Hasło jest wymagane",
      })
      .min(8, {
        message: "Hasło musi mieć minimum 8 znaków",
      })
      .regex(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/, {
        message: "Hasło musi zawierać małą i dużą literę oraz cyfrę",
      })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Hasło musi zawierać znak specjalny",
      }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Hasła muszą być takie same",
    path: ["repeatPassword"],
  });

export const RegisterStepperPersonalSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "Imię jest wymagane" })
    .max(50, { message: "Imię jest zbyt długie" }),
  lastName: z
    .string()
    .min(1, { message: "Nazwisko jest wymagane" })
    .max(50, { message: "Nazwisko jest zbyt długie" }),
  phone: z
    .string()
    .min(9, { message: "Numer telefonu musi zawierać co najmniej 9 cyfr" })
    .regex(/^\+48\s?([0-9]{3})\s?([0-9]{3})\s?([0-9]{3})$/, {
      message: "Niepoprawny format numeru telefonu",
    }),
});

export const RegisterStepperSalonSchema = z.object({
  name: z
    .string({ message: "Nazwa salonu jest wymagana" })
    .min(1, {
      message: "Nazwa salonu jest zbyt krótka",
    })
    .max(50, {
      message: "Nazwa salonu jest zbyt długa",
    }),
});
