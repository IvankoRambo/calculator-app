import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import looseJsonParse from '../utils/looseJsonParse';

const server = express();

server
  .use(bodyParser.json())
  .put('/calculate', (req: Request, res: Response) => {
    let { equation }: { equation: string } = req.body;

    try {
      if (equation) {
        equation = looseJsonParse(equation);
        equation = equation.toString()
      }

      res.status(200);
      res.json({ success: true, result: equation });
    } catch (e: any) {
      res.status(200);
      res.json({ success: false });
    }
  });

export default server;
