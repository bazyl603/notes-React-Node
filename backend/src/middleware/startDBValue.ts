import { getRepository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Note } from "../entity/Note";
import { User } from "../entity/User";

export async function startDBValue(connection: { manager: { save: (arg0: Note | User) => any; }; }){
    let arrNotes: Note[] = [];
    const userTable = getRepository(User);
    const userExist = await userTable.find({ select: ["login"] });
    if (!userExist.length){
        const noteTable = getRepository(Note);
        const anyNote: any = await noteTable.find({ select: ["id"] });

    if (!anyNote.length){

        for(let i=0; i<5; i++){
            let note = new Note();
            note.description = `note${i}`;
            note.lastEdit = new Date();
            arrNotes.push(note);
            await connection.manager.save(note);
        }
    }

    await bcrypt.hash("password", 12, async function(err, hash) {

        if(!err){
            let user = new User();
            user.login = "admin";
            user.password = hash;
            user.note = [...arrNotes];
            user.lastLogin = new Date();
            await connection.manager.save(user);
        }
  
        return err;
    }); 
    }
}
