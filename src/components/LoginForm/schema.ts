import { z } from "zod";
import { IFormFields } from "../../interfaces/IFormFields";

export const schema = z.object({
  userName: z.string().min(3, { message: "at least 3 chars for username" }),
  password: z.string().min(8, "Password must have at least 8 chars"),
});

export type formFields = z.infer<typeof schema>;

export const loginFormFields: IFormFields<formFields> = [
  {
    name: "userName",
    label: "Username",
    id: "userName",
    type: "text",
    placeholder: "Enter your username",
    style: ["formControl"],
  },
  {
    name: "password",
    label: "Password",
    id: "password",
    type: "password",
    placeholder: "Enter your password",
    style: ["formControl"],
  },
];
