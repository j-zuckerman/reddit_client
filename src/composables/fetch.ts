import { store } from "@/store";
import type Subreddit from "@/types/subreddit";
import type Post from "@/types/posts";
import generateUniqueId from "@/utils/generateId";

export async function fetchData(subredditName: string, sortBy: string = "best"): Promise<void> {
  store.loading = true;
  store.error = null;
  try {
    console.log(subredditName);
    const response = await fetch(`/.netlify/functions/reddit?subreddit=${subredditName}&sortBy=${sortBy}`);
    const result = await response.json();

    //console.log(result);
    // result. data.children = array of objects that need to be parsed
    console.log(result.data.children);

    const posts: Post[] = [];
    const uniqueId: string = generateUniqueId();
    let doesSubredditExist: boolean = checkIfSubredditExists(subredditName);

    for (let i = 0; i < result.data.children.length; i++) {
      let { id, author, selftext, title, ups, url, is_video, thumbnail, num_comments, permalink, is_gallery, over_18, post_hint, is_self } = result.data.children[i].data;
      let post_type: string = "";
      let image_url: string = "";
      let video_url: string = "";
      let external_link: string = "";
      let gallery_image_urls = [];
      permalink = "https://www.reddit.com/" + permalink;

      if (is_gallery) {
        post_type = "TYPE_GALLERY";
        let gallery_data = result.data.children[i].data["media_metadata"];
        console.table(gallery_data);

        for (const key in gallery_data) {
          if (gallery_data.hasOwnProperty(key)) {
            console.log(key + ": " + decodeURI(gallery_data[key].s.u));
            gallery_image_urls.push(decodeURI(gallery_data[key].s.u));
          }
        }
      } else if (is_video) {
        post_type = "TYPE_VIDEO";
        video_url = result.data.children[i].data["secure_media"].reddit_video["fallback_url"];
        console.log(video_url);
      } else if (is_self) {
        post_type = "TYPE_TEXT_ONLY";
      } else {
        if (post_hint === "link") {
          post_type = "TYPE_LINK";
          image_url = getPreviewImage(result.data.children[i].data);
          external_link = result.data.children[i].data.url;
        } else if (thumbnail.length > 0) {
          post_type = "TYPE_IMAGE";
          image_url = getPreviewImage(result.data.children[i].data);
        }
      }

      posts.push({ id, title, upvotes: ups, url: permalink, text: selftext, author, image_url, num_comments, post_type, video_url, external_link, gallery_image_urls });
    }

    const subreddit: Subreddit = {
      posts: posts,
      name: subredditName,
      url: `https://www.reddit.com/r/${subredditName}/`,
      id: uniqueId,
    };

    console.log(subreddit);

    // check if subreddit already exists; if so, refresh it
    if (doesSubredditExist) {
      refreshSubredditPosts(subreddit);
    } else store.data.push(subreddit);
  } catch (error) {
    console.log(error);
    store.error = (error as Error).message;
  } finally {
    store.loading = false;
  }
}

function checkIfSubredditExists(subredditName: string): boolean {
  const index = store.data.findIndex((subreddit) => subreddit.name === subredditName);
  if (index !== -1) return true;
  else return false;
}

function refreshSubredditPosts(subreddit: Subreddit): void {
  const index = store.data.findIndex((currentSubreddit) => currentSubreddit.name === subreddit.name);
  store.data[index].posts = subreddit.posts;
}

function getPreviewImage(data: any): string {
  console.log(data);
  const url1 = data?.preview?.images?.[0]?.source?.url;
  const url2 = data.thumbnail;

  return url1 ?? url2 ?? "default_image_url.jpg";
}
