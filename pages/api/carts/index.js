import { Order, LineItem, Product } from "../../../server/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const orders = await Order.findAll({
        where: {
          isCart: true,
        },
        include: [
          {
            model: LineItem,
            include: Product,
          },
        ],
      });
      res.json(orders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  if (req.method === "POST") {
    try {
      const order = await Order.create(req.body);
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
