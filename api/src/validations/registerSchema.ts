import z from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Name must have at least 3 characters."),
  email: z.string().email("Email not match."),
  password: z.string().min(6, "Password must have at least 6 characters."),
});
