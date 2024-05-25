import jwt from "jsonwebtoken";

export const jwtVerify = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) {
    res.status(404).json({ message: "no token found" });
  }

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) {
      return res.json({ message: "invalid token" });
    }
    // console.log(user);
    req.userId = user.id;
  });

  next();
};
