import type { APIRoute } from "astro";
import { db } from "@db/init";
import { errors } from "@vinejs/vine";
import { handleBulkShortcut } from "@src/utils/validator";

export const post: APIRoute = async ({ request }) => {
  try {
    const result = await handleBulkShortcut(await request.json());

    if (result instanceof errors.E_VALIDATION_ERROR) {
      return new Response(null, {
        status: 400,
        statusText: "Bad Request",
      });
    }

    await db.shortcut.createMany({
      data: result,
    });

    return new Response(JSON.stringify(result), {
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
    const bulkData = [] as any[];

    shortCuts.map((shortcut) => {
      const shortcutObj = {
        name: shortcut.name,
        url: shortcut.url,
        thumbnail: shortcut.thumbnail,
      };
      bulkData.push(shortcutObj);
    });

    if (!shortCuts) {
      return new Response(null, {
        status: 404,
        statusText: "Shortcuts not found",
      });
    }

    return new Response(JSON.stringify(bulkData), {
      status: 200,
      statusText: "Fetched Successfully",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
