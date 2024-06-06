## This is an Paytm Clone using MERN Stack

Note: This is not a fully secured app as I made it when learning MERN. There might be security leaks on large scale usage. But the functionality of Paytm is correctly defined in this project.

<h1>FILE STRUCTURE:</h1>
<h4> Backend </h4>

1. backend/routes/index.js contains code to handle the routing requests.

2. backend/user.js contains server requests (get,post,put) which help you:
                    * Signup and Signin
                    * Get all the user name and other details (to transfer them money)
                    * To update your details

3. middleware.js contains authorization logic to sign the incoming password 
    Note: In real life sceneraio you would hash the data first and then store it in a DB.

4. db.js contains DataBase Table Schemas and logic for connecting to a database.

5. config.js contains JWT_SECRET

Note: In real life scenerio confidential things like JWT_SECRET and DB url are stored in .env file










~~~~ For Someone who wants to build his own version ~~~~


## Build a basic version of PayTM


**Hints:**
(Used in backend/routes/user.js "/bulk" request)

[Mongoose's find method with $or condition does not work properly](https://stackoverflow.com/questions/7382207/mongooses-find-method-with-or-condition-does-not-work-properly) 
    
[How to query MongoDB with "like"](https://stackoverflow.com/questions/3305561/how-to-query-mongodb-with-like)


<h4>Fetching Data</h4>
**Regex Queries in MongoDB**
Starts with 789: /^789/
Ends with 789: /789$/
Contains 789 (equivalent to %789%): /789/


The following example matches all documents where the sku field is like `"%789"`:

`db.products.find( { sku: { $regex: /789$/ } } )`

The example is analogous to the following SQL LIKE statement:

`SELECT * FROM products WHERE sku like "%789";`



[Mongodb v4.0 Transaction, MongoError](https://stackoverflow.com/questions/51461952/mongodb-v4-O-transaction-mongoerror-transaction-numbers-are-only-allowed-on-a)