import { z } from "zod";

export const checkoutFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  lastName: z
    .string()
    .min(2, { message: "Last Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone Number must be 10 digits long" }),
  address: z.string().min(5, { message: "Enter correct address" }),
  comment: z.string().optional(),
});

export const authenticationFormSchemaLogin = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const authenticationFormSchemaRegister = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  lastName: z
    .string()
    .min(2, { message: "Last Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone Number must be 10 digits long" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export type TCheckoutFormSchema = z.infer<typeof checkoutFormSchema>;
export type TAuthenticationFormSchemaLogin = z.infer<
  typeof authenticationFormSchemaLogin
>;
export type TAuthenticationFormSchemaRegister = z.infer<
  typeof authenticationFormSchemaRegister
>;

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
