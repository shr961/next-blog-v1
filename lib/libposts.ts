import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { Post, PostsData } from "@/types/types";

export const readPostsData = (): PostsData => {
  const postsPath = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsPath);

  const posts = filenames.map((filename) => {
    const postPath = path.join(postsPath, filename);
    const content = fs.readFileSync(postPath, { encoding: "utf-8" });
    return matter(content) as Post;
  });

  const postsData = posts.map((post) => post.data);

  return postsData;
};

export const readPost = (slug: string): Post => {
  const postPath = path.join(process.cwd(), "posts", `${slug}.md`);
  const contnet = fs.readFileSync(postPath, { encoding: "utf-8" });
  const post = matter(contnet) as Post;

  return post;
};
