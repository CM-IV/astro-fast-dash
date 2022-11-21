import type { APIRoute } from "astro";
import { handleBulkShortcut } from "@utils/validator";
import { db } from "@db/init";

export const post: APIRoute = async ({ request }) => {
  try {
    const reqData = await request.json();

    const result = await handleBulkShortcut(reqData.shortcutData);

    if (!result.success) {
      return new Response(JSON.stringify(result), {
        status: 400,
        statusText: "Bad Request",
      });
    }

    await db.shortcut.createMany({
      data: result.data,
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
