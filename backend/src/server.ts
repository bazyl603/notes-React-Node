import "reflect-metadata";
import * as express from 'express';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import {createConnection, getRepository} from "typeorm";
import * as bcrypt from 'bcrypt';
import * as bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 8080;

app.use(morgan('dev'));
app.use(helmet());
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Orgin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

import * as noteRoutes from './routes/notesRoutes';
import * as authRoutes from './routes/authRoutes';

app.use(bodyParser.json());

//all notes
app.use('/notes', noteRoutes.default);

//one note
//app.use('/note',);

//authentication jwt
app.use('/auth', authRoutes.default);

//Error
app.use((error: any, req: any, res: any, next: any) => {
  console.log(error); //dev, on production delete
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

import {User} from "./entity/User";
createConnection().then(async connection => {
    const userTable = getRepository(User);
    const userExist = await userTable.find({ select: ["login"] });
    if (!userExist.length){
      await bcrypt.hash("password", 12, async function(err, hash) {
        if(!err){
          let user = new User();
          user.login = "admin";
          user.password = hash;
          user.lastLogin = new Date();
          await connection.manager.save(user);
        }
      
        return err;
      }); 
    }       

    app.listen(port, () => {
        console.log(`🎉 START Server on -> http://localhost:${port}` + ' -> time: ' + new Date().toLocaleDateString() + ' / ' + new Date().toTimeString());
      });
}).catch(error => console.log(error));


