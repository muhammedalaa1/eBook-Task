import { NextFunction, Request, Response } from "express";
import { findUserByToken } from "../utils/jwtToken";
import { APIError } from "../errors";
import cookie from "cookie";

export const auth = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.headers.cookie) return next();
  const cookies = cookie.parse(req.headers.cookie ?? "");
  const token = cookies[process.env.AUTH_COOKIE];
  if (!token) return next();
  req.user = await findUserByToken(token);
  next();
};

export const isLogged = function (
  LoggedIn: boolean,
  path: string | APIError = "/"
) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!!req.user === LoggedIn) return next();
    if (typeof path === "string") res.redirect(path);
    else throw path;
  };
};
