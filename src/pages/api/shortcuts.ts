import type { APIRoute } from "astro";
import { db } from "../../../prisma/init";


export const post: APIRoute = async ({ request }) => {

    try {
        const body = await request.json();

        await db.shortcut.create({
            data: { ...body },
        })


        return new Response(null, {
            status: 204,
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