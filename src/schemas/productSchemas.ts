import { z } from "zod";

export const productSchema = z.object({
  name: z.string(),
  description: z.nullable(z.string()),
  price: z.number().nonnegative(),
  stock: z.number(),
});
