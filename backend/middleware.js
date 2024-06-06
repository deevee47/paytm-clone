const JWT_SECRET = require("./routes/config");

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader.startsWith("Bearer")) {
        res.status(403).json({message:"Bearer token not found!"});
    }
    try {
    const token = authHeader.split(' ')[1];
        console.log("Token "+token)
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;

        next();
    }
    catch (err) {
        res.status(403).json({message:"Verification Failed"})
    }
}

module.exports = authMiddleware;