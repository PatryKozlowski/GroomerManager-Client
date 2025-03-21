import { z } from "zod";

const phoneRegex = new RegExp(/^\+48\s?([0-9]{3})\s?([0-9]{3})\s?([0-9]{3})$/);
const nameRegex = new RegExp(/^[a-zA-Z0-9\sąęćłńóśżźźĄĘĆŁŃÓŚŻŹ]+$/);
const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
);

const firstNameSchema = z
  .string({ message: "Imię jest wymagane" })
  .min(1, { message: "Imię jest wymagane" })
  .max(50, { message: "Imię jest zbyt długie" });

const lastNameSchema = z
  .string({ message: "Nazwisko jest wymagane" })
  .min(1, { message: "Nazwisko jest wymagane" })
  .max(50, { message: "Nazwisko jest zbyt długie" });

const emailSchema = z
  .string({ message: "Adres email jest wymagany" })
  .optional()
  .refine(
    (val) =>
      !val || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val),
    {
      message: "Podaj poprawny adres email",
    }
  );

const requiredEmailSchema = z
  .string({ message: "Adres email jest wymagany" })
  .min(1, { message: "Adres email jest wymagany" })
  .email({ message: "Podaj poprawny adres email" });

const passwordSchema = z
  .string({ message: "Hasło jest wymagane" })
  .min(8, {
    message: "Hasło musi mieć minimum 8 znaków",
  })
  .regex(passwordRegex, {
    message:
      "Hasło musi zawierać małą i dużą literę oraz cyfrę oraz znak specjalny",
  });

const phoneSchema = z
  .string({ message: "Numer telefonu jest wymagany" })
  .min(9, { message: "Numer telefonu musi zawierać co najmniej 9 cyfr" })
  .regex(phoneRegex, {
    message: "Niepoprawny format numeru telefonu",
  });

const nameSchema = z
  .string({ message: "Nazwa jest wymagana" })
  .min(1, { message: "Nazwa jest wymagana" })
  .max(50, { message: "Nazwa jest zbyt długa" })
  .regex(nameRegex, {
    message: "Nazwa może zawierać tylko litery i cyfry",
  });

export const LoginFromSchema = z.object({
  email: requiredEmailSchema,
  password: passwordSchema,
});

export const RegisterStepperAccountSchema = z
  .object({
    email: requiredEmailSchema,
    password: passwordSchema,
    repeatPassword: passwordSchema,
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Hasła muszą być takie same",
    path: ["repeatPassword"],
  });

export const RegisterStepperPersonalSchema = z.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  phone: phoneSchema,
});

export const RegisterStepperSalonSchema = z.object({
  name: nameSchema,
});

export const NewConfirmEmailTokenSchema = z.object({
  email: emailSchema,
});

export const CreateNewSalonSchema = z.object({
  name: nameSchema,
});

export const CreateEditClientSchema = z.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  phone: phoneSchema,
  email: emailSchema.optional(),
});

export const AddPetSchema = z.object({
  name: z.string().min(1, "Imię pupila jest wymagane"),
  breed: z.string().min(1, "Rasa jest wymagana"),
  birthDate: z.string().min(1, "Data urodzenia jest wymagana"),
  weight: z.string().min(1, "Waga jest wymagana"),
});

export const filterClientSchema = z.object({
  hasPets: z.boolean().optional(),
  hasEmail: z.boolean().optional(),
  lastVisitBefore: z.string().optional(),
  lastVisitAfter: z.string().optional(),
});
