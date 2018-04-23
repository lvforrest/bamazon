
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
    createTable();
});

var createTable =function(){
    connection.query("SELECT * FROM products", function(err,res){
        var table = new Table({
            head: ["ID", "Product Name", "Department", "Price", "Quantity"],
            colWidths:[10,20,20,10,10]
        });
        // console.log("ID | Product Name | Department Name | Price  Quanity");
        for (var i=0; i<res.length; i++){
            table.push([res[i].item_id + res[i].productName + 
                res[i].department_name + res[i].price + res[i].stockquanity]);
        } console.log(table.toString());
        customerInput(res);
    })
}
var customerInput = function(res){
    inquirer.prompt([
        {
            type:"input",
            message:"What is the ID of the item you are purchasing today?",
            name: "choice",
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
    var correct =false;
    for(var i=0; i <res.length; i++){
        if (res[i].productName ===answer.choice){
            correct= true;
            var product = answers.choice;
            var id = i;
        // createTable();
        }
        if ((res[id].stockquanity- answers.qty)>0){
            connection.query("UPDATE products SET stockquantity = " + res[id].stockquanity-answer.qty +
             "WHERE productName =" + product, function(err,res){
                 console.log(" Purchase complete!");
                 createTable();
             })
        } else {
            console.log("Not a valid choice");
            customerInput(res);
        }
    }
});
}