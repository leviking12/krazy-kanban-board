import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    res.sendStatus(401);
    return;
  }
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      res.sendStatus(403);
      return;
    }
    (req as any).user = decoded;
    next();
  });
};
