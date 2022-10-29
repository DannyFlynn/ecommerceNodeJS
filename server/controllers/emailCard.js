const con = require("../Db/pizza");

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

const cardSuccessReceipt = (req, res) => {
  const customerId = req.body.customerId;
  console.log(customerId);
  con.query(
    "SELECT customers_name, customers_email FROM customers WHERE order_id = ?",
    customerId,
    async (err, result) => {
      if (err) {
        console.log(err);
      } else {
        //grabbing customers email from the frontend to send them an email of confirmation
        const info = await JSON.parse(JSON.stringify(result));

        const customerEmail = await info[0].customers_email;
        const customerName = await info[0].customers_name;
        console.log(customerEmail, customerName);

        const options = {
          from: process.env.EMAIL,
          to: customerEmail,
          subject: "Pizza Time Confirmation",
          text: `Thank you ${customerName}  for trying my app out.  :) `,
        };

        transporter.sendMail(options, async (err, info) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log(info.response);
          await res.json({ message: "Email Sent" });
        });
      }
    }
  );
};

module.exports = cardSuccessReceipt;
