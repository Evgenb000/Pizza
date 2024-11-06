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

export type TCheckoutFormSchema = z.infer<typeof checkoutFormSchema>;
