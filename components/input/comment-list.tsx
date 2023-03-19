import classes from "./comment-list.module.css";
import { Comment } from "@/components/input/comment";

function CommentList(props: { comments: Comment[] }) {
  return (
    <ul className={classes.comments}>
      {props.comments?.map((comment) => (
        <li key={comment._id}>
          <p>{comment.text}</p>
          <div>
            By <address>{comment.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
