const con = require("../Db/pizza");

//pizza order
const pizzaOrder = (req, res) => {
  //looping through just to be sure no quantity number is a negative
  for (let i = 0; i < req.body.pizzas.length; i++) {
    if (req.body.pizzas[i] <= 0) {
      req.body.pizzas[i] = 0;
    }
  }

  //Will tell me  the quantity of pizzas per order per customer andwill be sent to sql database
  const [
    margerita,
    pepperroni,
    veggie,
    texasBbq,
    meatFeast,
    hamPineapple,
    farmhouse,
    bean,
    gravy,
  ] = req.body.pizzas;

  //payments being worked out for stripe
  let margeritaTotal = 12 * margerita;
  let pepperoniTotal = 10 * pepperroni;
  let veggieTotal = 9 * veggie;
  let texasBbqTotal = 14 * texasBbq;
  let meatFeastTotal = 15 * meatFeast;
  let hamPineappleTotal = 8 * hamPineapple;
  let farmhouseTotal = 10 * farmhouse;
  let beanSurpremeTotal = 12 * bean;
  let gravyVolcanoTotal = 9 * gravy;

  let totalPrice =
    (margeritaTotal +=
    pepperoniTotal +=
    veggieTotal +=
    texasBbqTotal +=
    meatFeastTotal +=
    hamPineappleTotal +=
    farmhouseTotal +=
    beanSurpremeTotal +=
      gravyVolcanoTotal);

  con.query(
    "INSERT INTO pizza_order (margerita, pepperoni, veggie_surpreme, texas_bbq, meatfeast, ham_pineapple, farmhouse, bean_surpreme, gravy_volcano, total_pounds) VALUES ('?', '?', '?', '?', '?', '?', '?', '?', '?', '?')",
    [
      margerita,
      pepperroni,
      veggie,
      texasBbq,
      meatFeast,
      hamPineapple,
      farmhouse,
      bean,
      gravy,
      totalPrice,
    ],
    async (err, result) => {
      if (err) {
        totalPrice = 0;
        res.status(500).send(err);
      } else {
        await res.status(201).json(result["insertId"]);
      }
    }
  );

  totalPrice = 0;
};

module.exports = pizzaOrder;
