const con = require("../Db/pizza");
//had to use ethereal to test email and success in real case scenario business email would be used
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAILPW,
  },
});

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const checkOut = (req, res) => {
  const items = req.body;
  const customerName = items.customerName;
  const customerAddress = items.customerAddress;
  const customerEmail = items.customerEmail;
  let customerCard = items.customerCard;
  const customerId = items.customerId;

  let cardPay;
  let cashPay;

  if (customerCard === true) {
    //customer pays by card
    cardPay = "Yes";
    cashPay = "No";
    con.query(
      "INSERT INTO customers (customers_name, customers_address, card, cash, order_id, customers_email) VALUES (?, ?, ?, ?, ?, ?)",
      [
        customerName,
        customerAddress,
        cardPay,
        cashPay,
        customerId,
        customerEmail,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          con.query(
            "SELECT customers.customers_name, customers.customers_address, pizza_order.total_pounds FROM customers, pizza_order WHERE customers.customers_name = ? AND customers.order_id = ? AND customers.order_id  = pizza_order.id",
            [customerName, customerId],
            async (error, response) => {
              if (error) {
                console.log(error);
              } else {
                let information = await JSON.parse(JSON.stringify(response));

                //price back to user
                const price = information[0]["total_pounds"];
                //will be sent to stripe
                let totalCost = information[0]["total_pounds"];

                //stripe works in pence hence the times 100pennies to a £1
                totalCost = parseInt(totalCost) * 100;

                /////
                const items = [{ id: 1, quantity: 1 }];

                const storeItems = new Map([
                  [1, { priceInCents: totalCost, name: "PizzaTime" }],
                ]);

                const session = await stripe.checkout.sessions.create({
                  payment_method_types: ["card"],
                  mode: "payment",
                  line_items: items.map((item) => {
                    const storeItem = storeItems.get(item.id);
                    return {
                      price_data: {
                        currency: "gbp",
                        product_data: {
                          name: storeItem.name,
                        },
                        unit_amount: storeItem.priceInCents,
                      },
                      quantity: item.quantity,
                    };
                  }),
                  success_url: `${process.env.CLIENT_URL}/outcome/success.html?name=${customerId}`,
                  cancel_url: `${process.env.CLIENT_URL}/outcome/cancel.html`,
                });
                await res.status(201).json({ url: session.url, price: price });
              }
            }
          );
        }
      }
    );
  } else {
    //customer pays by cash
    cardPay = "No";
    cashPay = "Yes";
    con.query(
      "INSERT INTO customers (customers_name, customers_address, card, cash, order_id, customers_email) VALUES (?, ?, ?, ?, ?, ?)",
      [
        customerName,
        customerAddress,
        cardPay,
        cashPay,
        customerId,
        customerEmail,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          con.query(
            "SELECT customers.customers_name, customers.customers_address, pizza_order.total_pounds FROM customers, pizza_order WHERE customers.customers_name = ? AND customers.order_id = ? AND customers.order_id  = pizza_order.id",
            [customerName, customerId],
            async (error, response) => {
              if (error) {
                console.log(error);
              } else {
                await res
                  .status(201)
                  .json({ payment: "cash", message: response });
                const options = {
                  from: process.env.EMAIL,
                  to: customerEmail,
                  subject: "Pizza Time",
                  text: `Thank you ${customerName} for trying my app out.  :)`,
                };

                transporter.sendMail(options, (err, info) => {
                  if (err) {
                    console.log(err);
                    return;
                  }
                  console.log(info.response);
                });
              }
            }
          );
        }
      }
    );
  }
};

module.exports = checkOut;
