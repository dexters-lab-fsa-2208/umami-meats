// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Order, LineItem, Product } from "../../server/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const orders = await Order.findAll({
        include: [
            {
                model: LineItem,
                include: Product
            }
        ]
      });
      console.log(orders)
      res.json(orders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  if (req.method === 'POST') {
    try {
      order = await Order.create(req.body);
      res.json(order);
    }
    catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  //TODO: FIND STATUS CODE & CHECK REQ.PARAMS || REQ.BODY
  if (req.method === 'DELETE') {
    try {
      order = Order.delete(req.params.order);
      res.status().json(order);
    }
    catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
