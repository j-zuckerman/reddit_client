export async function handler(event) {
  try {
    const params = event.queryStringParameters;
    const subredditName = params.subreddit || "all";
    const sortBy = params.sortBy || "best";

    const redditUrl = `https://www.reddit.com/r/${subredditName}/${sortBy}.json?include_over_18=false&limit=5&raw_json=1`;
    const res = await fetch(redditUrl);
    const result = await res.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
