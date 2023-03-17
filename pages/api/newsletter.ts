import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { connectDatabase, insertDocument } from "@/utils/db";

interface NewsletterRequest extends NextApiRequest {
  body: {
    email: string;
  };
}
export default async function handler(
  req: NewsletterRequest,
  res: NextApiResponse
) {
  const { email } = req.body;

  if (req.method === "POST") {
    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    let client: MongoClient;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }

    try {
      await insertDocument(client, "newsletter", { email });
      await client.close();
    } catch (error) {}
    res.status(201).json({ message: "Signed up!" });
    return;
  }
}
