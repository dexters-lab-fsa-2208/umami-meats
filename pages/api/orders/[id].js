// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Order, LineItem, Product } from "../../../server/db";

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    const order = await Order.findOne({
      where: {
        id: id,
      },
      include: [
        {
            model: LineItem,
            include: Product
        }
    ]
    });
    console.log(order);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  // res.status(200).json();
}
