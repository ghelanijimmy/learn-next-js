import { NextApiRequest, NextApiResponse } from "next";

interface NewsletterRequest extends NextApiRequest {
  body: {
    email: string;
  };
}
export default function handler(req: NewsletterRequest, res: NextApiResponse) {
  const { email } = req.body;

  if (req.method === "POST") {
    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    res.status(201).json({ message: "Signed up!" });
  }
}
