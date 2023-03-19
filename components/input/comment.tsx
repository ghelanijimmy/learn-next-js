import { useCallback, useContext, useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comment.module.css";
import NotificationContext from "@/store/notification-context";
import { STATUS } from "@/components/notification/notification";

export type Comment = {
  email: string;
  name: string;
  text: string;
  _id?: string;
  eventId?: string;
};

function Comments(props: { eventId: string }) {
  const { eventId } = props;

  const { showNotification } = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  const getComments = useCallback(async () => {
    const handleFetchComments = async () => {
      const response = await fetch(`/api/comments/${eventId}`);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      return await response.json();
    };

    try {
      const data = await handleFetchComments();
      setComments(data.comment);
    } catch (err) {
      showNotification({
        title: "Error!",
        message:
          err instanceof Error ? err.message : String("Something went wrong!"),
        status: STATUS.ERROR,
      });
    }
  }, [eventId, showNotification]);

  async function addCommentHandler(commentData: Comment) {
    const handleFetchComments = async () => {
      showNotification({
        title: "Loading...",
        message: "Adding comment...",
        status: STATUS.PENDING,
      });
      const response = await fetch(`/api/comments/${eventId}`, {
        method: "POST",
        body: JSON.stringify(commentData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      return await response.json();
    };

    try {
      await handleFetchComments();
      showNotification({
        title: "Success!",
        message: "Successfully added comment.",
        status: STATUS.SUCCESS,
      });
      await getComments();
    } catch (err) {
      showNotification({
        title: "Error!",
        message:
          err instanceof Error ? err.message : String("Something went wrong!"),
        status: STATUS.ERROR,
      });
    }
  }

  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      getComments().then(() => setIsFetchingComments(false));
    }
  }, [getComments, showComments]);

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && (
        <CommentList comments={comments} />
      )}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
