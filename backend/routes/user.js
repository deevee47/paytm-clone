const express = require("express");
const { Users, Account } = require("../db");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./config");
const authMiddleware = require("../middleware");

const signupSchema = zod.object({
  "username": zod.string().email(),
  "password": zod.string(),
  "firstName": zod.string(),
  "lastName": zod.string(),
})

const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signup", async (req, res) => {
    console.log(req.body)
    const { success } = signupSchema.safeParse(req.body)

    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const existingUser = await Users.findOne({ username: req.body.username }) 
    
    if (existingUser) {
        return res.status(411).json({
            message:"Username already taken!"
        })
    }
    
    const newUser = await new Users({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password
    }).save();

    const userId = newUser._id;

    await Account.create({
        userId:userId,
        balance: 1 + Math.random() * 10000
    })


    const token = jwt.sign({
        userId
    }, JWT_SECRET)
    
    res.status(200).json({
        message: "User Created Successfully",
        token: token
    })
    //You may want to implement try catch to handle error if user data is not created
})

router.post("/signin", async (req, res) => {

    const { success } = signinSchema.safeParse(req.body);
     if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }

    const existingUser = await Users.findOne({ username:req.body.username, password:req.body.password })
    if (!existingUser) {
        res.status(404).json({message: "User not found"});
    }
    
    const userId = existingUser._id
    const token = jwt.sign({
        userId
    }, JWT_SECRET)
    
    res.status(200).json({
        message: "User Signed in Successfully",
        token:token
    })
})



const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
});

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        });
    }
    
    await Users.updateOne({ _id: req.userId }, req.body);
    res.json({
        message: "Updated Successfully!"
    })
}) 

//Check README.MD
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || ""; //" " return all the users if filter is not provided.
    const users = await Users.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    // console.log(users);

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;