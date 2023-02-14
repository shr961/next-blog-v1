import { GrayMatterFile } from "gray-matter";

export type PostData = { title: string; meta: string; slug: string };

export interface Post extends GrayMatterFile<string> {
  data: { title: string; slug: string; meta: string };
}

export type PostsData = PostData[];
