import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { ParsedUrlQuery } from "querystring";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import {
  Blockquote,
  Container,
  List,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { HiCheck } from "react-icons/hi";
import { TbQuote } from "react-icons/tb";
import { readPost, readPostsData } from "@/lib/libposts";
import { useRouter } from "next/router";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

interface IStaticParams extends ParsedUrlQuery {
  slug: string;
}

const Post: NextPage<Props> = ({ post: { content, title } }) => {
  // const router = useRouter();

  // if fallback option in getStaticPaths is true, extran handling of page generation is required

  // if (router.isFallback) {
  //   return <p>Loading page...</p>;
  // }

  return (
    <Container size="sm">
      <Title order={1}>{title}</Title>
      <MDXRemote
        {...content}
        components={{
          p: (props) => <Text component="p">{props.children}</Text>,
          h2: (props) => <Title order={2}>{props.children}</Title>,
          blockquote: (props) => (
            <Blockquote icon={<TbQuote size={24} />} c="gray.6" fz="md">
              {props.children}
            </Blockquote>
          ),
          ul: (props) => (
            <List
              size="sm"
              spacing="md"
              my={12}
              icon={
                <ThemeIcon color="indigo" size="sm" radius="md" variant="light">
                  <HiCheck />
                </ThemeIcon>
              }
              withPadding
            >
              {props.children}
            </List>
          ),
          li: (props) => <List.Item>{props.children}</List.Item>,
        }}
      />
    </Container>
  );
};

export default Post;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context;
  const { slug } = params as IStaticParams;

  // const {
  //   post: { content, data },
  // }: ApiPost = await fetch(`http://localhost:3000/api/posts/${slug}`).then(
  //   (data) => data.json()
  // );

  try {
    const { content, data } = readPost(slug);
    const serializedContent = await serialize(content);

    return {
      props: { post: { content: serializedContent, title: data.title } },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const { posts }: ApiPosts = await fetch(
  //   "http://localhost:3000/api/posts"
  // ).then((data) => data.json());

  const postsData = readPostsData();

  const paths = postsData.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    paths,
    fallback: "blocking", // false, true, 'blocking'
  };
};
