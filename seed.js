const { db, User, Product, Tag } = require("./server/db");
const { users, products, tags } = require("./server/seedData");

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
      products.map((product) => {
        Product.create(product);
      })
    );
  } catch (e) {
    console.log(e);
  }
};

seed().catch((err) => {
  console.error("Problem seeding:", err);
  db.close();
});
