import { z } from "zod";

export const schema = z.object({
    fullName: z.string(),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters." }),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  });
  
  export type FormData = z.infer<typeof schema>;

