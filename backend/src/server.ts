import "reflect-metadata";
import * as express from 'express';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import {createConnection} from "typeorm";
import * as bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 8080;

app.use(morgan('dev'));
app.use(helmet());
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
	res.setHeader('Access-Control-Allow-Orgin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

import * as notesRoutes from './routes/notesRoutes';
import * as authRoutes from './routes/authRoutes';

app.use(bodyParser.json());

//all notes
app.use('/notes', notesRoutes.default);

//authentication jwt
app.use('/auth', authRoutes.default);

//Error
app.use((error: any, req: express.Request, res: express.Response, next: any) => {
  console.log(error); //dev, on production delete
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

import { startDBValue } from './middleware/startDBValue';
createConnection().then(async connection => {
    
    await startDBValue(connection);

    app.listen(port, () => {
        console.log(`🎉 START Server on -> http://localhost:${port}` + ' -> time: ' + new Date().toLocaleDateString() + ' / ' + new Date().toTimeString());
      });
}).catch(error => console.log(error));


