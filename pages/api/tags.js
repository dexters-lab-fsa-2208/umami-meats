// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Tag } from "../../server/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const tags = await Tag.findAll();
      res.json(tags);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  if (req.method === "POST") {
    try {
      const tag = await Tag.create(req.body);
      res.status(201).json(tag);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
