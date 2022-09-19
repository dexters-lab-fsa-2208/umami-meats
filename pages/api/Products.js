// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Product } from "../../server/db";

export default async function handler(req, res) {
    try {
      const products = await Product.findAll();
      console.log(products)
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  // res.status(200).json();
}
