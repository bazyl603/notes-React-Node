import "reflect-metadata";
import * as express from 'express';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import {createConnection} from "typeorm";

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
//app.use('/login',);

import {User} from "./entity/User";
createConnection().then(async connection => {

    let user = new User();
    user.login = "tom";
    user.password = "mar";
    user.lastLogin = new Date();
    user.created = new Date();
    
    await connection.manager.save(user);

    app.listen(port, () => {
        console.log(`🎉 START Server on -> http://localhost:${port}`)
      });
}).catch(error => console.log(error));


