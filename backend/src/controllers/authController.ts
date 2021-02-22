import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import {User} from "../entity/User";

export const login = async (req: any, res: any, next: any) => {
	const login: string = req.body.login;
    const password: string = req.body.password;

    let loadedUser: any; 
    await getRepository(User)
                        .findOne({ 
                            select: [ 'id', 'login', 'password', 'lastLogin', 'updatePassword' ],
                            where: { login: login }})
        .then(user => {
            if (!user || user == null) {
                const error: any = new Error('User with this login not exist');
                error.statusCode = 401;
                throw error;
            }
            
            loadedUser = user;
            const dbUserPassword = user.password.trim();
            return bcrypt.compare(password, dbUserPassword);
        })
        .then(async isEqual => {
            if (!isEqual) {
                const error: any = new Error('Wrong password!');
                error.statusCode = 401;
                throw error;
            }

            const token = jwt.sign(
                {
                  id: loadedUser.id,
                  login: loadedUser.login
                },
                'supersecretphrase',
                { expiresIn: '2h' }
            );
            
            loadedUser.lastLogin = new Date();
            await getRepository(User).save(loadedUser);
            res.status(200).json({ token: token, userId: loadedUser.id, toPath: '/notes' });
        })
        .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
        });
        
}