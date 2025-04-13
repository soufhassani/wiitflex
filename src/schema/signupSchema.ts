import { z } from "zod";

export const schema = z.object({
  fullname: z.string().min(1, { message: "fullName is required" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." }),
  email: z.string().email(),
  password: z.string().min(6),
});

export type FormData = z.infer<typeof schema>;
