import './OneNote.css';

interface NoteProps {
  date: number,
  description: string,
  deleteBtn: any,
  click: any
}

const OneNote: React.FC<NoteProps> = (props) => {
  const date = new Date(props.date).toLocaleString();
  const description = String(props.description).substring(0, 150) + " ...";
  return (
      <div className="Note">
          <p className="editDate">{date}</p>
          <button className="deleteButton" onClick={props.deleteBtn}><i className="fas fa-trash"></i></button>
          <div className="description" onClick={props.click}>{description}</div>       
      </div>
  );
};

export default OneNote;