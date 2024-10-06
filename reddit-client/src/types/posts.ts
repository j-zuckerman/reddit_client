export default interface Post {
  id: number;
  title: string;
  upvotes: number;
  author?: string;
  text?: string;
  url: string;
}
