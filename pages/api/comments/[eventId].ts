import { NextApiRequest, NextApiResponse } from "next";
import { Comment } from "@/components/input/comment";
import { MongoClient } from "mongodb";
import { connectDatabase, getAllDocuments, insertDocument } from "@/utils/db";

interface CommentRequest extends NextApiRequest {
  body: Comment;
}
export default async function handler(
  req: CommentRequest,
  res: NextApiResponse<{ message: string; comment?: Comment | Comment[] }>
) {
  const { eventId } = req.query;

  const client = await connectDatabase();

  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (email.includes("@") && name && text) {
      const newComment: Comment = {
        email,
        name,
        text,
        eventId: eventId as string,
      };

      let client: MongoClient;
      try {
        client = await connectDatabase();
      } catch (error) {
        res.status(500).json({ message: "Connecting to the database failed!" });
        return;
      }

      try {
        const result = await insertDocument<Comment>(
          client,
          "comments",
          newComment
        );
        newComment._id = result.insertedId.toString();
        res
          .status(201)
          .json({ message: "Comment added!", comment: newComment });
      } catch (error) {
        res.status(500).json({ message: "Inserting data failed!" });
        return;
      }
    } else {
      res.status(422).json({ message: "Invalid comment data." });
      await client.close();
    }
  }

  if (req.method === "GET") {
    let client: MongoClient;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }
    try {
      const results = await getAllDocuments<Comment>(
        client,
        "comments",
        {
          _id: -1,
        },
        { eventId: eventId as string }
      );
      res.status(200).json({ message: "Success!", comment: results });
    } catch (error) {
      res.status(500).json({ message: "Getting data failed!" });
    }
  }

  await client.close();
}
