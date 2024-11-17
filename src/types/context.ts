import { Request, Response } from 'express';
import { IUser } from '../models/User';

export interface Context {
  req: Request;
  res: Response;
  user?: IUser;
}