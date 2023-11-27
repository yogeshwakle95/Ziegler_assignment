const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async(req,res)=>{
  const {price} = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: "Eccomerce",
          },
          unit_amount: price * 100, // Convert to cents
        },
        quantity: 1, 
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });
  
  res.json({ id: session.id });
  

}