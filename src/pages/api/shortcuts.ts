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
        throw new Error;
    }

}