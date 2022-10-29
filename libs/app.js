const homeUrl = "http://localhost:5500/";
//basket icon on user interface
const cartWrapperShow = document.querySelector(".cart-wrapper-hide");
const mainContentHide = document.querySelector(".main-content");

const cancelOrder = document.getElementById("cancelOrder");
const cardEmail = document.getElementById("cardEmail");

if (cancelOrder) {
  cancelOrder.addEventListener("click", () => {
    window.location = homeUrl;
  });
}

//if the card is a success stripe will redirect to success page and user can request an email reciept this will fire to the backend and npm package nodemailer will send the  customer an email
if (cardEmail) {
  cardEmail.addEventListener("click", () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const customer = urlParams.get("name");
    console.log("send email to " + customer);
    const url = "http://localhost:3001/emailReceipt";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        customerId: customer,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log("error");
        }
        return response.json();
      })
      .then((data) => {
        window.location = homeUrl;
      });
  });
}

//customer information interface
const customerInfo = document.getElementById("customerInfo");

//cash information interface
const cashWrapperShow = document.querySelector(".cash-wrapper-hide");
const cashDeliveryInfo = document.getElementById("cashDeliveryInfo");

//btns
const basketBtn = document.getElementById("basket");
const clearBasket = document.getElementById("clearBasket");
const buyBtn = document.getElementById("buyBtn");
const deleteOrder = document.getElementById("deleteOrder");
const checkOut = document.getElementById("checkout");

//customer details after number of pizzas are set from user
const customerOrderNo = document.getElementById("customerOrderNo");
const fullName = document.getElementById("fullname");
const address = document.getElementById("address");
const email = document.getElementById("email");
const card = document.getElementById("card");
const cash = document.getElementById("cash");

//9 vars (pizzas)  :)

let margeritaQuantity = document.getElementById("margeritaQuantity");
let pepperoniQuantity = document.getElementById("pepperoniQuantity");
let veggieSurpemeQuantity = document.getElementById("veggieSurpemeQuantity");
let texasQuantity = document.getElementById("texasQuantity");
let meatFeast = document.getElementById("meatFeast");
let hamPineapple = document.getElementById("hamPineapple");
let farmhouse = document.getElementById("farmhouse");
let beanSurpreme = document.getElementById("beanSurpreme");
let gravyVolcano = document.getElementById("gravyVolcano");

const orderSuccess = document.querySelectorAll(".orderSuccess");

//basket total price
let total = document.getElementById("totalPrice");
let cost = 0;
let minusCost = 0;

let addOrMinus = true;

//quantity will be sent to the backend in the order of the pizzas on client side, if customer asks for the margeritas it will fire an array like this [3,0,0,0,0,0,0,0,0]
let quantity = [0, 0, 0, 0, 0, 0, 0, 0, 0];

//parse html string to integer so user can keep adding  for when customer clicks a pizza function call in appPizza function will explain more :)
function parseNumber(pizzaQuantity, price) {
  let stringToNumber = parseInt(pizzaQuantity.innerText);

  if (addOrMinus === true) {
    //using parseNumber to increment and decrement invoking this function within the two switch statments (increment)

    const add = 1;
    stringToNumber += add;
    pizzaQuantity.innerText = stringToNumber;
    cost += price;
    total.innerText = cost;
  } else if (stringToNumber > 0) {
    //decrement

    const minus = 1;
    stringToNumber -= minus;
    cost -= price;
    pizzaQuantity.innerText <= 0
      ? 0
      : (pizzaQuantity.innerText = stringToNumber);
    total.innerHTML = cost;
  }

  //Changes the cart color when basket has items

  cost === 0
    ? (basketBtn.style.color = "white")
    : (basketBtn.style.color = "#5cb85c");
}

function addPizza(price, name) {
  addOrMinus = true;
  switch (name) {
    case "Margerita":
      quantity[0] += 1;
      parseNumber(margeritaQuantity, price);

      break;
    case "Pepperoni":
      quantity[1] += 1;
      parseNumber(pepperoniQuantity, price);

      break;
    case "Veggie Surpreme":
      quantity[2] += 1;
      parseNumber(veggieSurpemeQuantity, price);
      break;

    case "Texas bbq":
      quantity[3] += 1;
      parseNumber(texasQuantity, price);
      break;

    case "MeatFeast":
      quantity[4] += 1;
      parseNumber(meatFeast, price);
      break;

    case "Ham & Pineapple":
      quantity[5] += 1;
      parseNumber(hamPineapple, price);
      break;

    case "Farmhouse":
      quantity[6] += 1;
      parseNumber(farmhouse, price);

    case "Bean Supreme":
      quantity[7] += 1;
      parseNumber(beanSurpreme, price);

      break;

    case "Gravy Volcano":
      quantity[8] += 1;
      parseNumber(gravyVolcano, price);

      break;
  }
}

//when you have selected the basket

function increment(pizza) {
  addOrMinus = true;
  switch (pizza) {
    case "margeritaQuantity":
      quantity[0] += 1;
      parseNumber(margeritaQuantity, 12);

      break;
    case "pepperoniQuantity":
      quantity[1] += 1;
      parseNumber(pepperoniQuantity, 10);
      break;
    case "veggieSurpremeQuantity":
      quantity[2] += 1;
      parseNumber(veggieSurpemeQuantity, 9);
      break;
    case "texasBbqQuantity":
      quantity[3] += 1;
      parseNumber(texasQuantity, 14);
      break;
    case "meatFeastQuantity":
      quantity[4] += 1;
      parseNumber(meatFeast, 15);
      break;
    case "hamPineappleQuantity":
      quantity[5] += 1;
      parseNumber(hamPineapple, 8);
      break;
    case "farmhouseQuantity":
      quantity[6] += 1;
      parseNumber(farmhouse, 10);
      break;
    case "beanSurpremeQuantity":
      quantity[7] += 1;
      parseNumber(beanSurpreme, 12);
      break;
    case "gravyVolcanoQuantity":
      quantity[8] += 1;
      parseNumber(gravyVolcano, 9);
      break;
  }
}

function decrement(pizza) {
  addOrMinus = false;
  switch (pizza) {
    case "margeritaQuantity":
      quantity[0] -= 1;
      parseNumber(margeritaQuantity, 12);
      break;
    case "pepperoniQuantity":
      quantity[1] -= 1;
      parseNumber(pepperoniQuantity, 10);
      break;
    case "veggieSurpremeQuantity":
      quantity[2] -= 1;
      parseNumber(veggieSurpemeQuantity, 9);
      break;
    case "texasBbqQuantity":
      quantity[3] -= 1;
      parseNumber(texasQuantity, 14);
      break;
    case "meatFeastQuantity":
      quantity[4] -= 1;
      parseNumber(meatFeast, 15);
      break;
    case "hamPineappleQuantity":
      quantity[5] -= 1;
      parseNumber(hamPineapple, 8);
      break;
    case "farmhouseQuantity":
      quantity[6] -= 1;
      parseNumber(farmhouse, 10);
      break;
    case "beanSurpremeQuantity":
      quantity[7] -= 1;
      parseNumber(beanSurpreme, 12);
      break;
    case "gravyVolcanoQuantity":
      quantity[8] -= 1;
      parseNumber(gravyVolcano, 9);
      break;
  }
}

let showBasket = true;

basketBtn.addEventListener("click", () => {
  if (showBasket) {
    mainContentHide.className = "main-content-hide";
    cartWrapperShow.className = "cart-wrapper-show";
    showBasket = false;
  } else {
    mainContentHide.className = "main-content";
    cartWrapperShow.className = "cart-wrapper-hide";
    showBasket = true;
  }
});

//proceeds to customer details
async function procceedToCheckout() {
  cartWrapperShow.className = "cart-wrapper-hide";
  mainContentHide.className = "main-content-hide";
  basketBtn.style.display = "none";
  //will fire to the backend and store the quantity of each pizza in mysql
  let [
    pizzaOne,
    pizzaTwo,
    pizzaThree,
    pizzaFour,
    pizzaFive,
    pizzaSix,
    pizzaSeven,
    pizzaEight,
    pizzaNine,
  ] = quantity;

  const url = "http://localhost:3001/pizzaOrder";

  await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      pizzas: [
        pizzaOne,
        pizzaTwo,
        pizzaThree,
        pizzaFour,
        pizzaFive,
        pizzaSix,
        pizzaSeven,
        pizzaEight,
        pizzaNine,
      ],
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.error);
      }
      return response.json();
    })
    .then((data) => {
      customerOrderNo.innerText = data;
      customerInfo.className = "customer-details-show";
    });
}

buyBtn.addEventListener("click", () => {
  //if all elements in the basket is 0 it will not procced to customer info
  for (let i = 0; i < quantity.length; i++) {
    if (quantity[i] !== 0) {
      procceedToCheckout();
    }
  }
});

//empty basket
function emptyBasket(items) {
  cost = 0;
  total.innerHTML = 0;

  margeritaQuantity.innerHTML = 0;
  pepperoniQuantity.innerHTML = 0;
  veggieSurpemeQuantity.innerHTML = 0;
  texasQuantity.innerHTML = 0;
  meatFeast.innerHTML = 0;
  hamPineapple.innerHTML = 0;
  farmhouse.innerHTML = 0;
  beanSurpreme.innerHTML = 0;
  gravyVolcano.innerHTML = 0;

  quantity = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  basketBtn.style.color = "white";
}

clearBasket.addEventListener("click", () => {
  emptyBasket();
});

deleteOrder.addEventListener("click", () => {
  basketBtn.style.display = "block";
  const customerId = parseInt(customerOrderNo.innerText);

  const url = `http://localhost:3001/deleteOrder${customerId}`;

  fetch(url, {
    method: "Delete",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.error);
      }
      return response.json();
    })
    .then(() => {
      emptyBasket();
      customerInfo.className = "customer-details-hide";
      customerOrderNo.innerText = null;
      mainContentHide.className = "main-content";
    });
});

//I only need to check if card is true or false as the function only gets called if both are digital and cash payments are both true or both false invoked from checkOutOrder
function paymentOptionError(digitialPay) {
  digitialPay === true
    ? alert("Only one payment oprion can be selected")
    : alert("Please select a payment option");
}

function checkOutOrder() {
  const url = "http://localhost:3001/checkout";
  if (
    (card.checked === true && cash.checked === true) ||
    (card.checked === false && cash.checked === false)
  ) {
    paymentOptionError(card.checked);
  } else {
    const customerId = customerOrderNo.innerText;
    const customerName = fullName.value;
    const customerAddress = address.value;
    const customerEmail = email.value;
    const customerCard = card.checked;
    const customerCash = cash.checked;

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        customerName,
        customerAddress,
        customerEmail,
        customerCard,
        customerCash,
        customerId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log("error");
        }
        return response.json();
      })
      .then((data) => {
        //cash payment
        if (data.payment === "cash") {
          customerInfo.className = "customer-details-hide";
          cashWrapperShow.className = "cash-wrapper";

          //estimated delivery time hours mins
          const time = new Date();
          let hours = time.getHours();
          let mins = time.getMinutes();

          mins <= 15 ? (hours = hours) : (hours += 1);
          mins <= 15 ? (mins += 40) : (mins = mins);

          let info;

          for (let i = 0; i < data.message.length; i++) {
            info = `<p>Delivery Time Within: ${hours}:${mins}</p><p>${data.message[i]["customers_name"]}</p><p>${data.message[i]["customers_address"]}</p><p>Total Price: £${data.message[i]["total_pounds"]}</p>
            <p>Please check your email.</p>`;
          }
          cashDeliveryInfo.innerHTML += info;
        } else {
          //card
          console.log(data);

          window.location = data.url;
        }
      });
  }
}

checkOut.addEventListener("click", () => {
  //late fix click spamming would duplicate customers name and address (display none fix)
  if (card.checked === true && cash.checked === false) {
    checkOut.style.display = "none";
    checkOutOrder();
  } else if (card.checked === false && cash.checked === true) {
    checkOut.style.display = "none";
    checkOutOrder();
  } else {
    checkOutOrder();
  }
});

orderSuccess.forEach((btn) => {
  btn.addEventListener("click", () => {
    window.location.reload();
  });
});
