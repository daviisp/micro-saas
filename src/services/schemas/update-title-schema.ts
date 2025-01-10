import { z } from "zod";

export const updateTitleSchema = z.object({
  title: z.string().min(1),
});
