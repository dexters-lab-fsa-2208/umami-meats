const { Order, LineItem } = require('../db');
const db = require('./db');
const { Sequelize } = db;
//jwt auth imported here

const User = db.define('user', {
	email: {
		type: Sequelize.STRING,
	},
	password: {
		type: Sequelize.STRING,
	},
	firstName: {
		type: Sequelize.STRING,
	},
	lastName: {
		type: Sequelize.STRING,
	},
});

//create authentication
User.prototype.generateToken = function () {
	return this.id;
};

User.byToken = async (token) => {
	try {
		const user = await User.findByPk(token);
		if (user) {
			return user;
		}
		const error = Error('Bad Credentials');
		error.status = 401;
		throw error;
	} catch {
		const error = Error('Bad Credentials');
		error.status = 401;
		throw error;
	}
};

User.authenticate = async ({ email, password }) => {
	const user = await User.findOne({
		where: {
			email,
			password,
		},
	});
	if (user) {
		return user;
	}
	
	const error = Error('Bad Credentials');
	error.status = 401;
	throw error;
};

User.prototype.getCart = async function () {
	const user = User.findOne({
		where: {
			id: this.id,
		},
		include: [
			{
				model: Order,
				isCart: true,
				include: [
					{
						model: LineItem,
					},
				],
			},
		],
	});
};

User.prototype.addToCart = async function () {
	//    grab the order associated with the user
	//    orders are your cart
};

User.prototype.removeFromCart = async function () {};

//coverting order model from cart to actual placed order
User.prototype.createOrder = async function () {};

module.exports = User;
