// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Product, Tag } from "../../../server/db";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
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
  }
//TODO: FIND STATUS CODE & CHECK REQ.PARAMS || REQ.BODY
if (req.method === 'DELETE') {
  try {
    const sushi = await Product.findByPk(id);
    sushi.destroy();
    res.status(204).json(sushi);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
}
if (req.method === 'PUT') {
  try {
    const sushi = await Product.findByPk(id);
    sushi.update(req.body);
    res.json(sushi);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
}}
