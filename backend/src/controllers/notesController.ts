export const getNotes = (req: any, res: any, next: any) => {
	return res.status(200).json({
		notes: [{ title: 'tytuł', content: 'this is content' }]
	});
}