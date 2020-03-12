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

// Creates the connection with the server and loads the manager menu upon a successful connection
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  loadManagerMenu();
});

// Get product data from the database
function loadManagerMenu() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    // Load the possible manager menu options, pass in the products data
    loadManagerOptions(res);
  });
}

// Load the manager options and pass in the products data from the database
function loadManagerOptions(products) {
  inquirer
    .prompt({
      type: "list",
      name: "choice",
      choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"],
      message: "What would you like to do?"
    })
    .then(function(val) {
      //TODO: Write your code here
      //input = val.choice
      var input = val.choice;
    if (input === "View Products for Sale") {
        console.table(products);
            loadManagerMenu();
    }
    else if(input === "View Low Inventory"){
        loadLowInventory();
    }
    else if (input === "Add to Inventory"){
        addToInventory(products);
    }
    else if(input === "Add New Product"){
      addNewItem();
    }
    else{
       connection.end();
       console.log("Goodbye");
    };
            
              
      
    });
};

// Query the DB for low inventory products
function loadLowInventory() {
  // Selects all of the products that have a quantity of 5 or less
  connection.query("select * from products where qty < 10;", function(err, res) {
    if (err) throw err;
    // Draw the table in the terminal using the response, load the manager menu
    console.table(res);
    loadManagerMenu();
  });
}

// Prompt the manager for a product to replenish
function addToInventory(inventory) {
  console.table(inventory);
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "What is the ID of the item you would you like add to?",
        validate: function(val) {
          return !isNaN(val);
        }
      }
    ])
    .then(function(val) {
      //TODO: Write your code here
     promptManagerForQuantity(val.choice)
    });
}

// Ask for the quantity that should be added to the chosen product
function promptManagerForQuantity(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many would you like to add?",
        validate: function(val) {
          return val > 0;
        }
      }
    ])
    .then(function(val) {
    
      //TODO: Write your code here
addQuantity(product, val.quantity)
    });
}

// Adds the specified quantity to the specified product
function addQuantity(product, quantity) {
    connection.query("update products set qty = qty + " + quantity + " where id = " + product + ";", function (err, res) {
        if (err) throw err;
        console.log("you added " + quantity + " items to product" + product);
        loadManagerOptions();
      });
}



// Prompts manager for new product info, then adds new product
function getProductInfo(departments) {
   inquirer.prompt([
    {
        type: "input",
        name: "id",
        message: "What is the id of the product you would like to add?"
      },
    {
        type: "input",
        name: "product_name",
        message: "What is the name of the product you would like to add?"
      },
      {
        type: "list",
        name: "department_name",
        choices: departments,
        message: "Which department does this product fall into?"
      },  
    {
      type: "input",
      name: "price",
      message: "How much does it cost?",
      validate: function(val) {
        return val > 0;
      }
    },
    {
      type: "input",
      name: "quantity",
      message: "How many do we have?",
      validate: function(val) {
        return !isNaN(val);
      }
    }
  ]).then(function(res){
    connection.query("insert into products(id, name, price, department, qty) values(" + res.id + ","  + '"' + res.product_name + '"' +  "," + res.price + ","   + '"' + res.department_name + '"' + "," + res.quantity + ");", function (err, res) {
        if (err) throw err;
        console.log(res);
       loadManagerOptions(); 
    });
  });
}

function addNewItem(){
    connection.query(  "SELECT department FROM products GROUP BY department HAVING count(*) >= 1;", function(err, res){
      if (err) throw err;
   var departments = [];   
for (var i = 0; i < res.length; i++) {
var element = res[i].department
  departments.push(element);
}
getProductInfo(departments);
;
 });


}

