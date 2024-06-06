const express = require("express");
const { Users } = require("./db");
const mainRouter = require("./routes/index")
const app = express();


//npm i cors
//npm i jsonwebtoken
const cors = require("cors")
app.use(cors());
app.use(express.json())
app.use("/api/v1", mainRouter);





app.put('/', (req, res) => {
    const updateQuery = req.body.updateQuery;
    res.send('PUT request to homepage')
})



app.listen(5000); 