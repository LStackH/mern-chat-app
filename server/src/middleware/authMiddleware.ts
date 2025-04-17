import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload as DefaultPayload } from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: { id: string; username: string; isAdmin: boolean };
}

interface MyJwtPayload extends DefaultPayload {
  userId: string;
  username: string;
  isAdmin: boolean;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (!header) {
    res.status(401).json({ error: "Authorization header missing" });
    return;
  }

  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token) {
    res.status(401).json({ error: "Invalid Authorization format" });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secret) as MyJwtPayload;
    req.user = {
      id: decoded.userId,
      username: decoded.username,
      isAdmin: decoded.isAdmin,
    };
    next();
  } catch (err) {
    res.status(401).json({ error: "Token verification failed" });
    return;
  }
};

export default authMiddleware;
