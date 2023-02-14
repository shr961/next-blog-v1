import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";
import matter from "gray-matter";

type Data = {};
type Query = { slug: string };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method, query } = req;
  const { slug } = query as Query;

  switch (method) {
    case "GET": {
      const post = readPost(slug);
      return res.json({ post });
    }
    default: {
      return res.status(404).send("پیدا نشد!");
    }
  }
}

function readPost(slug: string) {
  const postPath = path.join(process.cwd(), "posts", `${slug}.md`);
  const post = fs.readFileSync(postPath, { encoding: "utf-8" });

  return matter(post);
}
