// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Tag, Product } from "../../../server/db";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    try {
      const { id } = req.query;
      const steak = await Product.findOne({
        where: {
          id: id,
          type: "steaks",
        },
        include: [
          {
            model: Tag,
          },
        ],
      });
      res.json(steak);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  //TODO: FIND STATUS CODE & CHECK REQ.PARAMS || REQ.BODY
  if (req.method === "DELETE") {
    try {
      const steak = await Product.findByPk(id);
      steak.destroy();
      res.status(204).json(steak);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  if (req.method === "PUT") {
    try {
      const steak = await Product.findByPk(id);
      steak.update(req.body);
      res.json(steak);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
