// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Order, LineItem, Product } from "../../../server/db";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    try {
      const order = await Order.findOne({
        where: {
          id: id,
          isCart: true,
        },
        include: [
          {
            model: LineItem,
            include: Product,
          },
        ],
      });
      res.json(order);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  //TODO: FIND STATUS CODE & CHECK REQ.PARAMS || REQ.BODY
  if (req.method === "DELETE") {
    try {
      const order = await Order.findByPk(id);
      order.destroy();
      res.status(204).json(order);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  if (req.method === "PUT") {
    try {
      const order = await Order.findByPk(id);
      order.update(req.body);
      res.json(order);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
