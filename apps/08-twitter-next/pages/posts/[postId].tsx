import React from 'react';
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';

import { usePost } from '@/hooks';
import { CommentFeed, Form, Header, PostItem } from '@/components';

const PostView = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: fetchedPost, isLoading } = usePost(postId as string);

  console.log({fetchedPost});

  if (isLoading || !fetchedPost) {
    return (
      <div className='flex justify-center items-center h-full'>
        <ClipLoader color='lightblue' size={80} />
      </div>
    )
  }


  return (
    <>
      <Header label='Tweet' showBackArrow />
      <PostItem data={fetchedPost} />
      <Form
        postId={postId as string}
        isComment
        placeholder='Tweet your reply'
      />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  )
}

export default PostView