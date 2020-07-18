// Initializes the npm packages used
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

// Initializes the connection variable to sync with a MySQL database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon",
});

// Creates the connection with the server and loads the product data upon a successful connection
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  loadProducts("Welcome");
});

// Function to load the products table from the database and print results to the console
function loadProducts(message) {
  // Selects all of the data from the MySQL products table
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;

    // Draw the table in the terminal using the response
    console.table(res);

    // Then prompt the customer for their choice of product, pass all the products to promptCustomerForItem
    promptCustomerForItem();
    console.log(`\n\nmessage`);
  });
}

// Prompt the customer for a product ID
function promptCustomerForItem() {
  // Prompts user for what they would like to purchase
  inquirer
    .prompt([
      {
        name: "choice",
        type: "input",
        message:
          "enter a product id or press x to exit. \n\n type bal to see your current balance. \n\n type $spent to see the all time total you have spent",
      },
    ])
    .then(function (res) {
      if (res.choice === "x") {
        connection.end();
        console.log("goodbye");
      } else if (res.choice === "bal") {
        showBal();
      } else if (res.choice === "$spent") {
        showTotalSpent();
      } else {
        promptCustomerForQuantity(res.choice);
      }
    });
}

// Prompt the customer for a product quantity
function promptCustomerForQuantity(product) {
  inquirer
    .prompt([
      {
        type: "input",
        message: "specify the quanity",
        name: "qty",
      },
    ])
    .then(function (response) {
      makePurchase(product, response.qty);
    });
}

// Purchase the desired quantity of the desired item
function makePurchase(product, quantity) {
  connection.query(
    "select qty from products where id = " + product + ";",
    function (err, resp) {
      if (err) throw err;
      var qty = resp[0].qty;
      if (qty - quantity < 0) {
        loadProducts("Insufficient quantity!");
      } else {
        connection.query(
          "select price from products where id = " + product + ";",
          function (err, res) {
            if (err) throw err;
            var cost = res[0].price;
            connection.query(
              "select bal from balTable where id = 1;",
              function (err, resp) {
                if (err) throw err;
                var bal = resp[0].bal;
                var newBalance = cost * quantity;
                updateTotalSpent(newBalance);
                console.log("cost:" + newBalance);

                if (bal - newBalance <= 0) {
                  connection.end();
                  return console.log("insufficient balance of: " + bal);
                } else {
                  connection.query(
                    "update products set qty = qty - " +
                      quantity +
                      " where id = " +
                      product +
                      ";",
                    function (err, res) {
                      if (err) throw err;

                      // Draw the table in the terminal using the response
                      console.table(res);

                      updateBal(newBalance);
                    }
                  );
                }
              }
            );
          }
        );
      }
    }
  );
}

function showBal() {
  connection.query("select bal from balTable where id = 1;", function (
    err,
    res
  ) {
    if (err) throw err;
    console.log("you have: $" + res[0].bal + " remaining.");
    connection.end();
  });
}

function updateBal(balNum) {
  connection.query(
    "update balTable set bal = bal - " + balNum + " where id = 1;",
    function (err, res) {
      if (err) throw err;
      loadProducts(" ");
    }
  );
}

function updateTotalSpent(TotalSpent) {
  connection.query(
    "update balTable set tSpent = tSpent + " + TotalSpent + " where id = 1;",
    function (err, res) {
      if (err) throw err;
    }
  );
}

function showTotalSpent() {
  connection.query("select tSpent from balTable where id = 1;", function (
    err,
    res
  ) {
    if (err) throw err;
    loadProducts(`You have spent: ${res[0].tSpent}!`);
    //console.log("you have spent: " + res[0].tSpent + "!")
  });
}
