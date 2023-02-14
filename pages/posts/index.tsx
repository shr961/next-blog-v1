import { InferGetStaticPropsType, NextPage } from "next";
import { Container, Stack } from "@mantine/core";

import PostCard from "@/components/PostCard";
import { readPostsData } from "@/lib/libposts";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Posts: NextPage<Props> = ({ postsData }) => {
  return (
    <Container py="md">
      <Stack spacing={24}>
        {postsData.map((post) => (
          <PostCard
            description={post.meta}
            title={post.title}
            slug={post.slug}
            key={post.slug}
          />
        ))}
      </Stack>
    </Container>
  );
};

export default Posts;

export const getStaticProps = async () => {
  // const { posts }: ApiPosts = await fetch(
  //   "http://localhost:3000/api/posts"
  // ).then((data) => data.json());

  const postsData = readPostsData();

  return { props: { postsData } };
};
