import { createClient } from "redis";

const client = await createClient()
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

type WebsiteEvent = { url: string; id: string };

async function xAdd({ url, id }: WebsiteEvent) {
  const res6 = await client.xAdd(
    "better-uptime:website", "*", {
    url,
    id,
  });
}

export async function xAddBulk(websites: WebsiteEvent[]) {
  for (let i = 0; i < websites.length; i++) {
    await xAdd({
      url: websites[i]?.url as string,
      id: websites[i]?.id as string,
    });
  }
}
