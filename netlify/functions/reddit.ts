import type { Handler } from "@netlify/functions";

let accessToken: string | null = null;
let tokenExpiry = 0;

export const handler: Handler = async (event) => {
  try {
    const subreddit = event.queryStringParameters?.subreddit || "all";
    const sortBy = event.queryStringParameters?.sortBy || "best";

    await ensureAccessToken();

    const res = await fetch(`https://oauth.reddit.com/r/${subreddit}/${sortBy}?limit=5&raw_json=1`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const text = await res.text();

    const data = JSON.parse(text);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};

async function ensureAccessToken() {
  const now = Date.now();
  if (accessToken && now < tokenExpiry) return;

  const credentials = `${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`;
  const basicAuth = Buffer.from(credentials).toString("base64");

  const res = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch Reddit token: ${res.status} - ${text}`);
  }

  const tokenData = await res.json();
  accessToken = tokenData.access_token;

  tokenExpiry = Date.now() + tokenData.expires_in * 1000 - 60 * 1000;
}
