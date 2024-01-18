import { z } from "zod";

export const schema = z
  .object({
    username: z.string().min(3, { message: "username must be 3 chars long" }),
    email: z.string().email({ message: "must be a valid email" }),
    password: z.string().min(8, { message: "password must be 8 chars long" }),
    confirmPassword: z.string().min(8),
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
