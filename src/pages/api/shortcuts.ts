import type { APIRoute } from "astro";
import { db } from "@db/init";
import { handleShortcut } from "@utils/validator";
import { errors } from "@vinejs/vine";

export const post: APIRoute = async ({ request }) => {
  try {
    const result = await handleShortcut(await request.json());

    if (result instanceof errors.E_VALIDATION_ERROR) {
      return new Response(null, {
        status: 400,
        statusText: "Bad Request",
      });
    }

    const shortcut = await db.shortcut.create({
      data: { ...result },
    });

    return new Response(JSON.stringify(shortcut), {
      status: 201,
      statusText: "Created Successfully",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const get: APIRoute = async () => {
  try {
    const shortCuts = await db.shortcut.findMany();

    if (!shortCuts) {
      return new Response(null, {
        status: 404,
        statusText: "Shortcuts not found",
      });
    }

    return new Response(JSON.stringify(shortCuts), {
      status: 200,
      statusText: "Fetched Successfully",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
