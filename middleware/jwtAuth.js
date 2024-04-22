const jwt = require("jsonwebtoken");


const generateToken = (payload) => {
  return jwt.sign(payload, "secretToken", { expiresIn: '1h' }); 
};

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "No token found, authentication failed" });
  }

  try {
    const decoded = jwt.verify(token, "secretToken");
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { generateToken, verifyToken };
