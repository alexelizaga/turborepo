import { FC } from "react";
import { Comment } from "@prisma/client";

import { CommentItem } from "@/components";

interface CommentFeedProps {
  comments?: Comment[]
}

const CommentFeed: FC<CommentFeedProps> = ({ comments = [] }) => {
  return(
    <>
      {comments?.map((comment: Comment) => (
        <CommentItem key={comment.id} data={comment} />
      ))}
    </>
  )
}

export default CommentFeed;