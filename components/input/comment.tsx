import { useCallback, useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comment.module.css";

export type Comment = {
  email: string;
  name: string;
  text: string;
  id?: string;
  eventId?: string;
};

function Comments(props: { eventId: string }) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  const getComments = useCallback(() => {
    fetch(`/api/comments/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data.comment);
      });
  }, [eventId]);

  async function addCommentHandler(commentData: Comment) {
    // send data to API
    const response = await fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    await response.json();
    getComments();
  }

  useEffect(() => {
    if (showComments) {
      getComments();
    }
  }, [getComments, showComments]);

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
