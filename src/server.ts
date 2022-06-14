import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import apiRoutes from './routes/api';

dotenv.config();

const server = express();
// server.use(bodyParser.urlencoded({ extended: true }));
// server.use(bodyParser.json());
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(apiRoutes);

server.use((req: Request, res: Response) => {
  res.status(404);
  res.json({ error: 'endpoint não encontrado!' });
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server running at ${port} `);
});
