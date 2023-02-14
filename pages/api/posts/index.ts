import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";
import matter from "gray-matter";

type Data = {};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;

  switch (method) {
    case "GET": {
      const posts = readPosts();
      return res.json({ posts });
    }
    default: {
      return res.status(404).send("پیدا نشد!");
    }
  }
}

function readPosts() {
  const postsPath = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsPath);

  const posts = filenames.map((filename) => {
    const postPath = path.join(postsPath, filename);
    const content = fs.readFileSync(postPath, { encoding: "utf-8" });

    return matter(content).data;
  });

  return posts;
}
