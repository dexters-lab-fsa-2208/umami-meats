// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Product, Tag } from "../../server/db";

export default async function handler(req, res) {
  try {
    const sushi = await Product.findAll({
      where: {
        type: "sushi",
      },
      include: Tag,
    });
    res.json(sushi);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  // res.status(200).json();
}
