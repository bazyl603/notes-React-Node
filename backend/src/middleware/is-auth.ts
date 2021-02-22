import * as jwt from 'jsonwebtoken';

export default (req: any, res: any, next: any) => {
    const authHeader = req.get('Authorization');
    if(!authHeader) {
        const error: any = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }

    const token = authHeader.split(' ')[1];
    let decodedToken: any;

    try {
        decodedToken = jwt.verify(token, 'supersecretphrase');
      } catch (error) {
        error.statusCode = 500;
        throw error;
      }

    if (!decodedToken) {
        const error: any = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
}