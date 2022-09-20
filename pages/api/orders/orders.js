// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Order, LineItem } from "../../../server/db";

export default async function handler(req, res) {
    try {
      const orders = await Order.findAll({
        include: [
            {
                model: LineItem
            }
        ]
      });
      console.log(orders)
      res.json(orders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}
