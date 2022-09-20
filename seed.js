const { db, User, Product, Order, LineItem, Tag } = require('./server/db')
const { users, products, orders, tags, lineItems } = require('./server/seedData')

const seed = async () => {
	try {
        await db.sync({ force: true });
		await Promise.all(
            tags.map((tag) => {
				Tag.create(tag);
			})
		);
		await Promise.all(
			users.map((user) => {
				User.create(user);
			})
		);
		await Promise.all(
            orders.map((order) => {
				Order.create(order);
			})
		);
		await Promise.all(
            products.map((product) => {
				Product.create(product);
			})
		);
		
		await Promise.all(
			lineItems.map((lineItem) => {
				LineItem.create(lineItem);
			})
		);
		
    } catch (e) {
        console.log(e);
    }
}

seed()
	.catch((err) => {
		console.error('Problem seeding:', err);
		db.close();
	});
