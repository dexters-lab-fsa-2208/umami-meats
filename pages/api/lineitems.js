// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Order, LineItem, Product } from '../../server/db';

export default async function handler(req, res) {
	if (req.method === 'GET') {
		try {
			const lineitems = await LineItem.findAll();
			console.log(lineitems);
			res.json(lineitems);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}
	if (req.method === 'POST') {
		try {
			const lineItem = await LineItem.create(req.body);
			res.status(201).json(lineItem);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}
}
