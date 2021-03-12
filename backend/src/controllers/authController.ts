import * as bcrypt from 'bcrypt';
import {
    Request,
    Response
} from 'express';
import * as jwt from 'jsonwebtoken';
import {
    getRepository
} from 'typeorm';

import {
    User
} from "../entity/User";

export const login = async (req: Request, res: Response, next: any) => {
    const login: string = req.body.login;
    const password: string = req.body.password;

    let loadedUser: any;
    await getRepository(User)
        .findOne({
            select: ['id', 'login', 'password', 'lastLogin', 'updatePassword'],
            where: {
                login: login
            }
        })
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

            const token = jwt.sign({
                    id: loadedUser.id,
                    login: loadedUser.login
                },
                'supersecretphrase', {
                    expiresIn: '5h'
                }
            );

            loadedUser.lastLogin = new Date();
            await getRepository(User).save(loadedUser);
            res.status(200).json({
                token: token,
                userId: loadedUser.id,
                toPath: '/notes',
                expiresTime: '5'
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

}

export const changePassword = async (req: Request, res: Response, next: any) => {
    const userId: string = req.body.userId;
    const password: string = req.body.password;
    const newPassword: string = req.body.newPassword;

    let loadedUser: any;
    await getRepository(User)
        .findOne({
            select: ['id', 'login', 'password', 'updatePassword'],
            where: {
                id: userId
            }
        })
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

            newPassword.trim();
            await bcrypt.hash(newPassword, 12, async function (err, hash) {
                if (!err) {
                    const token = jwt.sign({
                            id: loadedUser.id,
                            login: loadedUser.login
                        },
                        'supersecretphrase', {
                            expiresIn: '2h'
                        }
                    );
                    loadedUser.password = hash;
                    loadedUser.updatePassword = new Date();
                    loadedUser.lastLogin = new Date();
                    await getRepository(User).save(loadedUser);

                    res.status(200).json({
                        message: 'Password change!',
                        token: token,
                        userId: loadedUser.id,
                        toPath: '/notes'
                    });
                }
                return err;
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}