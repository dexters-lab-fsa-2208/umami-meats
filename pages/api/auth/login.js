const { User } = require('../../../server/db');

export default async function handler(req, res) {
	if (req.method === 'GET') {
		console.log(req.headers.authorization)
		user = await User.byToken(req.headers);
		if (user) {
			res.send(user);
		} else {
			res.sendStatus(404);
		}
	}
	if (req.method === 'POST') {
		try {
            console.log('POST', User);
			const user = await User.authenticate(req.body);
			if (!user) res.sendStatus(404);
			const token = await user.generateToken();
			res.send(token);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}
}

// router.post('/auth', async (req, res, next) => {
// 	try {
// 		const user = await User.authenticate(req.body);
// 		if (!user) res.sendStatus(404);
// 		const token = await user.generateToken();
// 		res.send(token);
// 	} catch (ex) {
// 		next(ex);
// 	}
// });

// router.get('/auth', async (req, res, next) => {
// 	user = await User.byToken(req.headers.authorization);
// 	if (user) {
// 		res.send(user);
// 	} else {
// 		res.sendStatus(404);
// 	}
// });

// module.exports = router;
