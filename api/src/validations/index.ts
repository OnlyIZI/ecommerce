import { loginSchema } from "validations/loginSchema";
import { registerSchema } from "validations/registerSchema";

export const schema = {
  register: registerSchema,
  login: loginSchema,
};
