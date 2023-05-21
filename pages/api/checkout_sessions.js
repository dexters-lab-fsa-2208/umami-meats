const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// [
//   {
//     // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//     price_data: {
//       currency: "usd",
//       product_data: {
//         name: "testName",
//         description: "test description",
//       },
//       unit_amount: 25000,
//     },
//     quantity: 1,
//   },
// ],

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = JSON.parse(req.body.data);
    console.log("checkout", data);
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: data.map((item, idx) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.product.name,
              description: item.product.desc,
              //UPDATE THIS TO VERCELURL.COM/IMAGES/ITEM.PRODUCT.IMG AFTER DEPLOY
              images: [item.product.img],
            },
            unit_amount: item.product.price.split(".").join(""),
          },
          quantity: item.qty,
        })),
        mode: "payment",
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.redirect(303, session.url);
      // res.send(session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
