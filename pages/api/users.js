// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from "../../server/db";

export default async function handler(req, res) {
    try {
      const users = await User.findAll();
      console.log(users)
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  // res.status(200).json();
}
