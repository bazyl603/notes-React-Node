import { getConnection, getRepository } from 'typeorm';
import { validationResult } from 'express-validator';
import { Note } from "../entity/Note";
import { User } from '../entity/User';
import { Request, Response } from 'express';

export const getNotes = async (req: Request, res: Response, next: any) => {
	const userId: string = req.body.id;

	await getRepository(User).findOne({ select: [ 'id'], where: { id: userId }})
		.then(async (user) => {
			if (!user || user == null) {
                const error: any = new Error('User with this login not exist');
                error.statusCode = 401;
                throw error;
            }

			const allNotes = await getRepository(Note);
			await allNotes.find({select: ["id", "description", "created"],
								where: [ { user: userId }]
			}).then(notes => {
				return res.status(200).json({ notes: notes });
			}).catch(err => {
				if (!err.statusCode) {
		  			err.statusCode = 500;
				}
				next(err);
			});
		}).catch(err => {
			if (!err.statusCode) {
				const error: any = new Error('invalid user ID');
                error.statusCode = 500;
                throw error;
			}
			next(err);
		});
	
}

export const createNote = async (req: Request, res: Response, next: any) => {
	const errors = validationResult(req);
  	if (!errors.isEmpty()) {
    	const error: any = new Error('Validation failed, entered data is incorrect');
    	error.statusCode = 422;
    	throw error;
  	}

	const userId = req.body.id;
	const description = req.body.description;

	await getRepository(User).findOne({ select: [ 'id'], where: { id: userId }})
		.then(async (user) => {
			if (!user || user == null) {
                const error: any = new Error('User with this login not exist');
                error.statusCode = 401;
                throw error;
            }

			try {
				await getConnection()
				.createQueryBuilder()
				.insert()
				.into(Note)
				.values([
					{ description: description, user: userId }
				])
				.execute();

				return res.status(201).json({ message: "Succes!", toPath: '/notes'});

			}catch(err) {
				const error: any = new Error(`Don't save note`);
                error.statusCode = 500;
                throw error;
			}	

		}).catch(err => {
			if (!err.statusCode) {
				const error: any = new Error('invalid user ID');
                error.statusCode = 500;
                throw error;
			}
			next(err);
		})
}

export const deleteNote = async (req: Request, res: Response, next: any) =>{
	console.log(req.params.noteId);
	// const errors = validationResult(req);
  	// if (!errors.isEmpty()) {
    // 	const error: any = new Error('Validation failed, entered data is incorrect');
    // 	error.statusCode = 422;
    // 	throw error;
  	// }

	// const postId: string = req.params.postId;
	// const userId= req.body.userId;
	//   console.log(userId + ' / ' + postId);
	// await getRepository(User).findOne({ select: [ 'id'], where: { id: userId }})
	//   		.then(async (user) => {
	// 			console.log(user + '' + postId);
	// 		}).catch(err => {
	// 			if (!err.statusCode) {
	// 				const error: any = new Error('invalid user ID');
    //             	error.statusCode = 500;
    //             	throw error;
	// 			}
	// 			next(err);
	// 		})
			return res.status(200).json({ message: "Delete succes!", toPath: '/notes'});
};