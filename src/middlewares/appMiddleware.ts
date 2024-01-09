import { Express, Request, Response, NextFunction } from 'express';

function appMiddleware(req, res, next) {
  // Your middleware logic here
  next();
}

export default appMiddleware;
