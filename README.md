# bamazon
# created by Tacob Tate for homework

Bamazon is like a node cli version of Amazon.<br>
To install:<br>
clone (ssh):<code>git@github.com:JacobTate/bamazon.git</code><br>
clone (https): <code>https://github.com/JacobTate/bamazon.git</code><br>
Git bash command: <code> git clone [url]</code><br>
There are two views. customer view and manager view.<br>
To see the customer view use <code> node bamazonCostomer.js</code><br>
For manager view use <code> node bamazonManager.js</code><br>
When You open the customer view you will see a table of all of the products for sale. there are 4 operations You can perform.
<img src="images/coustomerView.png">
- x<br>
- bal<br>
- $spent<br>
- product id
<br> 
press x to quit.<br>
bal will whow You how much money You have<br>
<img src="images/coustomerBal.png">
$spent will show You the all time total ammount You have spent.<br>
<img src="images/coustomerSpent.png">
On the left side of the table You will see the names of the products and their id's.
To purchace a item enter Its id and You will be promped for the quanity You would like to purchase.
<img src="images/customerPurchase.png">
After You enter the quanity it will make sure there is enough in stock
<img src="images/customerOutOfStock.png">
 and that You have enough money.
 <img src="images/customerOutOfBal.png">
When You open the manager view you will see several options.
<img src="images/managerView.png">
<br>

- View Products for Sale<br>
- View Low Inventory<br>
- Add to Inventory<br>
- Add New Product<br>
- Quit<br>
View products for sale will whow You the table of all the products currently for sale.<br>
<img src="images/managerForSale.png">
View low inventory will show You a table of all the products for sale with less than 10 left.<br>
<img src="images/managerLow.png">
Add to inventory show the product table and ask you to input the id of the product you would like to add to. Then you will be asked how many You would like to add.<br>
<img src="images/managerAdd.png">
Add new product will ask you sevaral questions about the product you would like to add. You will be asked for the product id, the name,
the department, the price and the quanity. See the <a href="https://www.youtube.com/watch?v=u-zbZPuzvWE&feature=youtu.be" target="_blank">Video</a><br>
Things to see:

- Costomer view <a href="https://www.youtube.com/watch?v=wlKy8HSuXoI&feature=youtu.be" target="_blank">Video</a><br>
- Manager view <a href="https://www.youtube.com/watch?v=zWSGd41u-cg&feature=youtu.be" target="_blank">Video</a><br>
- Add a product <a href="https://www.youtube.com/watch?v=u-zbZPuzvWE&feature=youtu.be" target="_blank">Video</a>
- Database setup <a href="https://youtu.be/S_uShaCs8r4" target="_blank">video</a>
