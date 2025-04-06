import { z } from "zod";

export const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
});

export type FormData = z.infer<typeof schema>;
