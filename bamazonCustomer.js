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
  database: "bamazon"
});

// Creates the connection with the server and loads the product data upon a successful connection
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  loadProducts();
});

// Function to load the products table from the database and print results to the console
function loadProducts() {
  // Selects all of the data from the MySQL products table
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    // Draw the table in the terminal using the response
    console.table(res);

    // Then prompt the customer for their choice of product, pass all the products to promptCustomerForItem
    promptCustomerForItem();
  });
 
}

// Prompt the customer for a product ID
function promptCustomerForItem() {
  // Prompts user for what they would like to purchase
  inquirer.prompt([
    {
      name: "choice",
      type: "input",
      message: "enter a product code press x to exit"
  },
  
  ]).then(function(res){

  
if(res.choice === "x"){
  connection.end();
}
else{
  promptCustomerForQuantity(res.choice);
}
 
  });
}

// Prompt the customer for a product quantity
function promptCustomerForQuantity(product) {
  inquirer.prompt([
    {
      type: "input",
      message: "specify the quanity",
      name: "qty"
    }
  ]).then(function (response){
    
    makePurchase(product, response.qty)
  });
}


// Purchase the desired quantity of the desired item
function makePurchase(product, quantity) {
  connection.query("select qty from products where id = "+ product + ";", function(err, resp){
    if (err) throw err;
    var qty = resp[0].qty;
    if(qty - quantity <= 0 ){
      connection.end();
      return console.log("Insufficient quantity!");
    }
    else{
      connection.query("update products set qty = qty - " + quantity + " where id = "+ product + ";", function(err, res) {
        if (err) throw err;
    
        // Draw the table in the terminal using the response
        console.table(res);
    
        // Then prompt the customer for their choice of product, pass all the products to promptCustomerForItem
        promptCustomerForItem(res);
      });
    }
  })

 
  loadProducts();
}

// Check to see if the product the user chose exists in the inventory
function checkInventory(choiceId, inventory) {
 
}

 



// Check to see if the user wants to quit the program
function checkIfShouldExit(choice) {
  if (choice.toLowerCase() === "q") {
    // Log a message and exit the current node process
    console.log("Goodbye!");
    process.exit(0);
  }
}
