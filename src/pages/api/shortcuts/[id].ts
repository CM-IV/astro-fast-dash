import type { APIRoute } from "astro";
import { db } from "@db/init";
import { handleShortcut } from "@utils/validator";

export const put: APIRoute = async ({ request, params }) => {
  try {
    const id = params.id as string;
    const result = await handleShortcut(await request.json());

    if (!result.success) {
      return new Response(JSON.stringify(result.error.message), {
        status: 400,
        statusText: "Bad Request",
      });
    }

    await db.shortcut.update({
      where: {
        id: id,
      },
      data: { ...result.data },
    });

    return new Response(JSON.stringify(result.data), {
      status: 200,
      statusText: "Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const del: APIRoute = async ({ params }) => {
  try {
    const id = params.id as string;

    await db.shortcut.delete({
      where: {
        id: id,
      },
    });

    return new Response(null, {
      status: 200,
      statusText: "Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const get: APIRoute = async ({ params }) => {
  try {
    const id = params.id as string;

    const shortcut = await db.shortcut.findUnique({
      where: {
        id: id as string,
      },
    });

    if (!shortcut) {
      return new Response(null, {
        status: 404,
        statusText: "Not found",
      });
    }

    return new Response(JSON.stringify(shortcut), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
