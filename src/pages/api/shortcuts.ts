import type { APIRoute } from "astro";
import { handleShortcut } from "@utils/validator";
import { db } from "@prisma/init";


export const post: APIRoute = async ({ request }) => {

    try {
        const result = await handleShortcut(await request.json());

        if (!result.success) {
            return new Response(JSON.stringify(result.error.message), {
                status: 400,
                statusText: "Bad Request"
            })
        }

        await db.shortcut.create({
            data: { ...result.data },
        })

        return new Response(JSON.stringify(result.data), {
            status: 201,
            statusText: "Created Successfully"
        })
    } catch (error) {
        console.log(error);
        throw error;
    }

}

export const get: APIRoute = async () => {

    try {

        const shortCuts = await db.shortcut.findMany();

        if (!shortCuts) {
            return new Response(null, {
                status: 404,
                statusText: "Shortcuts not found"
            })
        }

        return new Response(JSON.stringify(shortCuts), {
            status: 200,
            statusText: "Fetched Successfully"
        })
    } catch (error) {
        console.log(error);
        throw error;
    }

}