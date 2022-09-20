// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Product, Tag } from "../../../../server/db";

export default async function handler(req, res) {
    try {
        const { id } = req.query;
      const sushi = await Product.findOne({
        where: {
            id: id,
            type: "sushi"
        },
        include: [
            {
                model: Tag
            }
        ]
      });
      console.log(sushi)
      res.json(sushi);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  // res.status(200).json();
}
