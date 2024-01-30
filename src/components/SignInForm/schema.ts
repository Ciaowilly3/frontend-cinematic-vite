import { z } from "zod";
import { IFormFields } from "../../interfaces/IFormFields";

export const schema = z
  .object({
    userName: z.string().min(3, { message: "username must be 3 chars long" }),
    email: z.string().email({ message: "must be a valid email" }),
    password: z.string().min(8, { message: "password must be 8 chars long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "password must be 8 chars long" }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        message: "password must match",
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
      });
    }
  });

export type formFields = z.infer<typeof schema>;

export const signInFormFields: IFormFields<formFields> = [
  {
    name: "userName",
    label: "Username",
    id: "userName",
    type: "text",
    placeholder: "Username",
    style: ["formControl"],
  },
  {
    name: "email",
    label: "Email",
    id: "email",
    type: "email",
    placeholder: "Email",
    style: ["formControl"],
  },
  {
    name: "password",
    label: "Password",
    id: "password",
    type: "password",
    placeholder: "Password",
    style: ["formControl"],
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    id: "confirmPassword",
    type: "password",
    placeholder: "Confirm Password",
    style: ["formControl"],
  },
];
