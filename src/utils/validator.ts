// import { z } from "zod";
import vine from "@vinejs/vine";
import type { Infer } from "@vinejs/vine/build/src/types";

const URLStringContstraint = vine.string().url();

const formData = vine.object({
  name: vine.string(),
  url: URLStringContstraint,
  thumbnail: URLStringContstraint,
});

const bulkData = vine.array(formData).notEmpty();

const ShortCutOutput = vine.object({
  id: vine.string().uuid(),
  ...formData.getProperties(),
});

export type BulkData = Infer<typeof bulkData>;
export type FormData = Infer<typeof formData>;
export type ShortCutOutput = Infer<typeof ShortCutOutput>;

export async function handleShortcut(rawData: unknown) {
  const validator = vine.compile(formData);
  const output = await validator.validate(rawData);

  return output;
}

export async function handleBulkShortcut(rawData: unknown) {
  const validator = vine.compile(bulkData);
  const output = await validator.validate(rawData);

  return output;
}
