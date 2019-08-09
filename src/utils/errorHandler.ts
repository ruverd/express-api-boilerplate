import winston from "winston";
import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import HttpException from './HttpException';
import config from './../config/config';
import fs from 'fs';
import path from 'path';
import 'express-async-errors';

// handle not found errors
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND);
  res.json({
    success: false,
    message: 'Requested Resource Not Found'
  });
  res.end();
};

// handle internal server errors
export const internalServerError = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR);
  res.json({
    success: false,
    message: err.message,
    errors: err
  });
  res.end();
};

export const handleExceptions = (() => {

  const logFile = path.join('logs', '/logfile.log');
  const uncaughtExceptions = path.join('logs', '/uncaughtExceptions.log');

  winston.exceptions.handle(new winston.transports.Console());
  winston.exceptions.handle(new winston.transports.File({ filename: uncaughtExceptions }));

  
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });
  
  winston.add(new winston.transports.File({ filename: logFile }));
})()