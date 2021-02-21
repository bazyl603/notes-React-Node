import "reflect-metadata";
import * as express from 'express';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import {createConnection, getRepository} from "typeorm";
import * as bcrypt from 'bcrypt';

const app = express();
const port = process.env.PORT || 8080;

morgan('dev');

app.use(helmet());
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Orgin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

import * as noteRoutes from './routes/notesRoutes';

//all notes
app.use('/notes', noteRoutes.default);

//one note
//app.use('/note',);

//authentication jwt
//app.use('/auth',);


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
        console.log(`🎉 START Server on -> http://localhost:${port}`)
      });
}).catch(error => console.log(error));


