import jwt from "jsonwebtoken";

export const jwtAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "devix token secret", (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.redirect("/users/auth");
      }
      console.log(decodedToken);
      next();
    });
  }
  res.redirect("/users/auth");
};
