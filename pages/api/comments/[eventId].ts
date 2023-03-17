import { NextApiRequest, NextApiResponse } from "next";
import { Comment } from "@/components/input/comment";

interface CommentRequest extends NextApiRequest {
  body: Comment;
}
export default function handler(
  req: CommentRequest,
  res: NextApiResponse<{ message: string; comment?: Comment | Comment[] }>
) {
  const { eventId } = req.query;

  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (email.includes("@") && name && text) {
      const newComment = {
        id: new Date().toISOString(),
        email,
        name,
        text,
      };
      res.status(201).json({ message: "Comment added!", comment: newComment });
    } else {
      res.status(422).json({ message: "Invalid comment data." });
    }
  }

  if (req.method === "GET") {
    const dummyList = [
      {
        id: "c1",
        name: "Max",
        email: "",
        text: "A first comment!",
      },
      {
        id: "c2",
        name: "Max",
        email: "",
        text: "A second comment!",
      },
    ];
    res.status(200).json({ message: "Success!", comment: dummyList });
  }
}
