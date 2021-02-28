import {
	getConnection,
	getRepository
} from 'typeorm';
import {
	validationResult
} from 'express-validator';
import {
	Note
} from "../entity/Note";
import {
	User
} from '../entity/User';
import {
	Request,
	Response
} from 'express';

export const getNotes = async (req: Request, res: Response, next: any) => {
	const userId: string = req.body.id;

	await getRepository(User).findOne({
			select: ['id'],
			where: {
				id: userId
			}
		})
		.then(async (user) => {
			if (!user || user == null) {
				const error: any = new Error('User with this login not exist');
				error.statusCode = 401;
				throw error;
			}

			const allNotes = await getRepository(Note);
			await allNotes.find({
					select: ["id", "description", "created", 'lastEdit'],
					where: [{
						user: userId
					}]
				})
				.then(notes => {
					return res.status(200).json({
						notes: notes
					});
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

};

export const createNote = async (req: Request, res: Response, next: any) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error: any = new Error('Validation failed, entered data is incorrect');
		error.statusCode = 422;
		throw error;
	}

	const userId = req.body.id;
	const description = req.body.description;

	await getRepository(User).findOne({
			select: ['id'],
			where: {
				id: userId
			}
		})
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
					.values([{
						description: description,
						user: userId
					}])
					.execute();

				return res.status(201).json({
					message: "Succes!",
					toPath: '/notes'
				});

			} catch (err) {
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
};

export const deleteNote = async (req: Request, res: Response, next: any) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error: any = new Error('Validation failed, entered data is incorrect');
		error.statusCode = 422;
		throw error;
	}

	const noteId = req.query.noteId;
	const userId = req.body.userId;
	await getRepository(Note).findOne({
			select: ['id', 'user'],
			where: {
				id: noteId,
				user: userId
			}
		})
		.then(async note => {
			if (!note || note == null) {
				const error: any = new Error('Could not find post.');
				error.statusCode = 401;
				throw error;
			}

			try {
				await getConnection()
					.createQueryBuilder()
					.delete()
					.from(Note)
					.where("id = :id", {
						id: noteId
					})
					.execute();

				return res.status(200).json({
					message: "Delete succes!",
					toPath: '/notes'
				});

			} catch (err) {
				const error: any = new Error(`Don't delete note`);
				error.statusCode = 500;
				throw error;
			}
		}).catch(err => {
			if (!err.statusCode) {
				const error: any = new Error('invalid user ID or note ID');
				error.statusCode = 500;
				throw error;
			}
			next(err);
		});
};

export const editNote = async (req: Request, res: Response, next: any) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error: any = new Error('Validation failed, entered data is incorrect');
		error.statusCode = 422;
		throw error;
	}

	const noteId = req.query.noteId;
	const description = req.body.description;
	const userId = req.body.userId;

	await getRepository(Note).findOne({
			select: ['id', 'user'],
			where: {
				id: noteId,
				user: userId
			}
		})
		.then(async note => {
			if (!note || note == null) {
				const error: any = new Error('Could not find post.');
				error.statusCode = 401;
				throw error;
			}

			try{
				let nowDate = new Date();

				await getConnection()
				.createQueryBuilder()
				.update(Note)
				.set({
					description: description,
					lastEdit: nowDate
				})
				.where("id = :id AND user = :user", {
					id: noteId,
					user: userId
				})
				.execute();

				return res.status(200).json({
					message: "Edit succes!",
					toPath: `/notes/?noteId=${noteId}`
				});
			} catch (err) {
				const error: any = new Error(`Don't edit-save note`);
				error.statusCode = 500;
				throw error;
			}
			

		}).catch(err => {
			if (!err.statusCode) {
				const error: any = new Error('invalid user ID or note ID');
				error.statusCode = 401;
				throw error;
			}
			next(err);
		});
}