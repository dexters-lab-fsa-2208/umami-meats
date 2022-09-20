// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Tag, Product } from "../../../server/db";

export default async function handler(req, res) {
    try {
        const { id } = req.query;
      const steak = await Product.findOne({
        where: {
            id: id,
            type: "steak"
        },
        include: [
            {
                model: Tag
            }
        ]
      });
      console.log(steak)
      res.json(steak);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  // res.status(200).json();
}
