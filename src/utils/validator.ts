import { z } from "zod";

const URLStringContstraint = z.string().url();

const formData = z.object({
  name: z.string(),
  url: URLStringContstraint,
  thumbnail: URLStringContstraint,
});

const bulkData = z.array(formData).nonempty();

const ShortCutOutput = formData.extend({
  id: z.string().uuid(),
});

// Zod inferred types
export type ShortCutOutput = z.infer<typeof ShortCutOutput>;

// Zod parsers
export async function handleShortcut(rawData: unknown) {
  const result = formData.safeParse(rawData);

  return result;
}

export async function handleBulkShortcut(rawData: unknown) {
  const result = bulkData.safeParse(rawData);

  return result;
}
