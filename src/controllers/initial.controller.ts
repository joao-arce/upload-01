import { Request, Response } from 'express';

export const initial = async (req: Request, res: Response) => {
  res.send('Hello !');
};
