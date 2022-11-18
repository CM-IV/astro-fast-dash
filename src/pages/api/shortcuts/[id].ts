import type { APIRoute } from "astro";
import { db } from "../../../../prisma/init";

export const put: APIRoute = async ({ request, params }) => {

    try {
        const id = params.id as string;
        const body = await request.json();

        await db.shortcut.update({
            where: {
                id: id
            },
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

export const del: APIRoute = async ({ params }) => {

    try {
        const id = params.id as string;

        await db.shortcut.delete({
            where: {
                id: id
            }
        })


        return new Response(null, {
            status: 200,
            statusText: "Deleted Successfully"
        })
    } catch (error) {
        console.log(error);
        throw new Error;
    }

}