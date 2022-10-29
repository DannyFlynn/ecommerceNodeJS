const express = require("express");
const pizzaOrder = require("../controllers/pizzaOrder");
const deleteOrder = require("../controllers/deleteOrder");
const checkOut = require("../controllers/checkOut");
const cardSuccessReceipt = require("../controllers/emailCard");
const Router = express.Router();

//pizza order fires to mysql database logic can be found  in controllers/pizzaOrder
Router.post("/pizzaOrder", pizzaOrder);

//cash or card payments(stripe) logic can be found in controllers/checkOut
Router.post("/checkout", checkOut);
//card success and user requests email
Router.post("/emailReceipt", cardSuccessReceipt);
//card cancelled email sent and order deleted of sql database

//Delete the order the customer has selected logic can be found in controllers/deleteOrder
Router.delete("/deleteOrder:id", deleteOrder);

module.exports = Router;
