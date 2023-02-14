import { FC } from "react";
import { Text, Card, Flex, Container, Box, Transition } from "@mantine/core";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  slug: string;
}

const PostCard: FC<Props> = ({ title, description, slug }): JSX.Element => {
  return (
    <Container size="sm">
      <Box component={Link} href={`/posts/${slug}`} td="none">
        <Card
          shadow="sm"
          p="md"
          radius="md"
          sx={{
            transition: "all 0.2s ease",
            ":hover": { transform: "translateY(-2.5px)" },
          }}
          withBorder
        >
          <Flex justify="center" align="center" direction="column">
            <Text component="h2" c="dark.4" fz="lg">
              {title}
            </Text>

            <Text component="p" c="gray.7" fz="sm">
              {description}
            </Text>
          </Flex>
        </Card>
      </Box>
    </Container>
  );
};

export default PostCard;
