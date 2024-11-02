export default interface Post {
  id: number;
  post_type: string;
  title: string;
  url: string;
  upvotes: number;
  num_comments?: number;
  author?: string;
  text?: string;
  image_url?: string;
  thumbnail_url?: string;
  external_link?: string;
  video_url?: string;
  gallery_image_ids?: Array<any>;
}
