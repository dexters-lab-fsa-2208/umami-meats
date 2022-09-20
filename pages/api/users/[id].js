// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User, Order, LineItem, Product } from "../../../server/db";

export default async function handler(req, res) {
    try {
        const { id } = req.query;
      const user = await User.findOne({
        where: {
            id: id,
        },
        include: [
            {
                model: Order,
                include: [
                    {
                        model: LineItem,
                        include: Product
                    }
                ]
            }
        ]
      });
      console.log(user)
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  // res.status(200).json();
}
