import { z } from "zod";


export const shortCut = z.object({
    name: z.string(),
    url: z.string().url(),
    thumbnail: z.string().url()
});

export async function handleShortcut(rawData: any) {
    const result = shortCut.safeParse(rawData);

    return result;
}