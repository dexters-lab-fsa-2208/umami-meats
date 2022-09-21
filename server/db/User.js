const { Order, LineItem, Product } = require('../db');
const db = require('./db');
const { Sequelize } = db;
//jwt auth imported here
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
User.prototype.generateToken = async function () {
	try {
		const token = jwt.sign({ id: this.id }, process.env.JWT);
		console.log(token);
		return token;
	} catch (error) {
		console.error(error);
	}
};
User.byToken = async (token) => {
	try {
		let payload = jwt.verify(token, process.env.JWT);
		if (payload) {
			console.log('payload', payload);
			const user = await User.findOne({
				where: {
					id: payload.id
				},
				include: Order

				
				});
			return user;
		}
		const error = Error('Bad Credentials');
		error.status = 401;
		throw error;
	} catch (err) {
		const error = Error(err);
		error.status = 401;
		throw error;
	}
};

User.authenticate = async ({ email, password }) => {
	const user = await User.findOne({ where: { email } });
	const isPasswordValid = await bcrypt.compare(
		password,
		user.dataValues.password
	);
	if (isPasswordValid) {
		return user;
	} else {
		console.log('password invalid');
	}

	const error = Error('Bad Credentials');
	error.status = 401;
	throw error;
};

User.beforeCreate(async (user) => {
	const hashedPassword = await bcrypt.hash(user.password, 5);
	user.password = hashedPassword;
});

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
