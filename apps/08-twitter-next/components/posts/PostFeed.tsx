import { FC } from 'react';
import { Post } from '@prisma/client';

import { usePosts } from '@/hooks';
import { PostItem } from '@/components';

interface PostFeedProps {
  userId?: string;
}

const PostFeed: FC<PostFeedProps> = ({ userId }) => {
  const { data: posts = [] } = usePosts(userId);
  return (
    <>
      {posts.map((post: Post) => (
        <PostItem
          key={post.id}
          userId={userId}
          data={post}
        />
      ))}
    </>
  )
}

export default PostFeed