import { z } from "zod";

const URLStringContstraint = z.string().url();

const formData = z.object({
  name: z.string(),
  url: URLStringContstraint,
  thumbnail: URLStringContstraint,
});

const ShortCutOutput = formData.extend({
  id: z.string().uuid(),
});

export type ShortCutOutput = z.infer<typeof ShortCutOutput>;

export async function handleShortcut(rawData: unknown) {
  const result = formData.safeParse(rawData);

  return result;
}
