
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table =require ("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password:"root",
    database: "bamazon_DB"
})

connection.connect(function(err){
    if (err) throw err;
    console.log("connection successful");
    customerInput();
})

function createTable(res){
        var table = new Table({
            head: ["ID", "Product Name", "Department", "Price", "Quantity"],
            colWidths:[10,45,40,8,10]
        });
        // console.log("ID | Product Name | Department Name | Price  Quanity");
        for (var i=0; i <res.length; i++){
            table.push([res[i].item_id,res[i].productName, 
                res[i].department_name, res[i].price, res[i].stockquanity]);
        } 
        console.log(table.toString());
    
}

var customerInput = function(){
    connection.query("SELECT * FROM products", function(err,res){
        createTable(res);
        var choiceArray = [];
		for (var i = 0; i < res.length; i++) {
			choiceArray.push(res[i].productName);
		}
    inquirer.prompt([
        {
            type:"input",
            message:"What is the ID of the item you are purchasing today?",
            name: "id",
            validate: function(value){
                if(isNaN(value)== false){
                    return true;
                }else{
                    return false;
                }
            }
    },
    {
        type: "confirm",
        message: "Are you sure:",
        name: "confirm",
        default: true

    },
    {
        type: "input",
        message: "How many would you like to purchase?",
        name: "qty",
        validate: function(value){
            if(isNaN(value) ==false){
                return true;
            } else {
                return false;
            }
        }
    }
    
]).then(function(answers){
    console.log(answers);
			var itemID = answers.id;
			console.log(itemID);
			var userItem = res[itemID-1];
			console.log(userItem);
			var newQuantity = userItem.stockquanity - answers.qty;
			if (newQuantity >= 0) {
				connection.query("UPDATE products SET ? WHERE item_id = ?", [{ stockquanity: newQuantity }, itemID]);
				customerInput();
			} else {
                console.log("There are not enough in stock for you to purchase.");     
			}
		})
	})
}