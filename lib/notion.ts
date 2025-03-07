import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";


export const notion = new NotionAPI();

export async function getData(rootPageId: any) {
  return await notion.getPage(rootPageId);
}

export const notionDatabase = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function getDatabase(): Promise<any[]> {
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    throw new Error("Missing NOTION_DATABASE_ID environment variable");
  }

  try {
    const response = await notionDatabase.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: "due_date",
          direction: "descending",
        },
      ],
    });

    return response.results as any;
  } catch (error) {
    console.error("Error fetching Notion database:", error);
    throw error;
  }
}
