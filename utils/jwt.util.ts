import "dotenv/config";
import jwt from "jsonwebtoken";

type TokenData = {
  [key: string]: any;
};

const generateWebToken = (data: TokenData) => {
  return jwt.sign(data, process.env.JWT_SECRET_KEY!);
};

const verifyWebToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY!);
};

export default { generateWebToken, verifyWebToken };
