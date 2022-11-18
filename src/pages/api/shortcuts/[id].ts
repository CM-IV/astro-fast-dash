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

export const del: APIRoute = async ({ params, redirect }) => {

    try {
        const id = params.id as string;

        const del = await db.shortcut.delete({
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

export const get: APIRoute = async ({ params }) => {

    try {
        const id = params.id as string;

        const shortcut = await db.shortcut.findUnique({
            where: {
                id: id as string
            }
        })

        if (!shortcut) {
            return new Response(null, {
                status: 404,
                statusText: 'Not found'
            });
        }


        return new Response(JSON.stringify(shortcut), {
            status: 200,
            headers: {
              "Content-Type": "application/json"
            }
        });

    } catch (error) {
        console.log(error);
        throw new Error;
    }

}