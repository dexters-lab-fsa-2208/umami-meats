// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Order, LineItem } from "../../../server/db";

export default async function handler(req, res) {
    try {
      const order = await Order.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: LineItem
            }
        ]
      });
      console.log(order)
      res.json(order);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  // res.status(200).json();
}
