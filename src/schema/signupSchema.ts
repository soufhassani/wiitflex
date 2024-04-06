import { z } from "zod";

export const schema = z.object({
    fullName: z.string().min(1, { message: "Please entre your name" }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters." }),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6, { message: "Password must contain at least 6 character(s)." }),
  });
  
  export type FormData = z.infer<typeof schema>;

