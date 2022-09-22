// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Order, LineItem, Product } from '../../../server/db';

export default async function handler(req, res) {
	const { id } = req.query;
	if (req.method === 'GET') {
		try {
			const lineItem = await LineItem.findOne({
				where: {
					id: id,
				},
				include: Product
			});
			console.log(lineItem);
			res.json(lineItem);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}
	//TODO: FIND STATUS CODE & CHECK REQ.PARAMS || REQ.BODY
	if (req.method === 'DELETE') {
		try {
			const lineItem = await LineItem.findByPk(id);
			lineItem.destroy();
			res.status(204).json(lineItem);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}
	if (req.method === 'PUT') {
		try {
			const lineItem = await LineItem.findByPk(id);
			lineItem.update(req.body);
			res.json(lineItem);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}
}
