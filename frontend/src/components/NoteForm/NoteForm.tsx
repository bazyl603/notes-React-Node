import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { actionCreators } from '../../redux';
import './NoteForm.css';

const NoteForm: React.FC<any> = (props) => {
  const [description, setDescription] = useState<string>(props.description);
  const [saveToggler, setSaveToggler] = useState<boolean>(false);
  const [saveORback, setsaveORback] = useState<any>('save');
  const [colorBtn, setColorBtn] = useState<any>({background: 'brown'});
  const [changeCheck, setChangeCheck] = useState<boolean>(true);

  const { createNote, clearNote, editNote } = props;

  const history = useHistory();

  useEffect(() => {
    if (saveToggler === true) {
      setsaveORback(<i className="fas fa-arrow-left"></i>);
      setColorBtn({background: 'green'});
    } else {
      setsaveORback('save');
    }
  }, [saveToggler, changeCheck]);

  let createData = new Date(props.created).toLocaleDateString();
  if (!props.created){
    createData = new Date().toLocaleDateString();
  } 

  let lastEditData = new Date(props.lastEdit).toLocaleString();
  if (!props.created){
    lastEditData = new Date().toLocaleString();
  }   

  const handlerSubmit = (event: any) => {
    event.preventDefault();
    
    if (saveToggler === false && !props.noteId) {
      createNote(props.userId, props.token, description, props.created, props.lastEdit);
      console.log("save");
    }

    if (saveToggler === false && props.noteId) {
      editNote(props.userId, props.token, props.noteId, description, props.created, props.lastEdit);
      console.log("edit");
    }

    setSaveToggler(true);
    setChangeCheck(false);

    if (saveToggler === true) { 
      clearNote();     
      history.push("/", { from: "/note" });
    }
  }

  const textChange = (event: any) => {
    event.preventDefault();
    setDescription(event.target.value);
    if (saveToggler === true) {
      setSaveToggler(false);
      setColorBtn({background: 'brown'});
      setChangeCheck(true);
    }    
  }
    return (
        <div className="NoteForm">
          <p>Created: {createData} / Last edit: {lastEditData}</p>
              <textarea value={description} name="description" onChange={textChange}/>
              <div className="NoteBarr">
                <button className="saveORback" style={colorBtn} onClick={handlerSubmit}>{saveORback}</button>
                <p>{saveToggler ? 'saved' : 'save before go back'}</p>
              </div>     
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
      loading: state.note.loading,
      token: state.auth.token,
      userId: state.auth.userId,
      description: state.note.description,
      noteId: state.note.id,
      created: state.note.created,
      lastEdit: state.note.lastEdit
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
      createNote: (userId: string, token: string, description: string, created:  string, lastEdit: string) => dispatch(actionCreators.createNote(userId, token, description, created, lastEdit)),
      clearNote: () => dispatch(actionCreators.clearNote()),
      editNote: (userId: string, token: string, noteId: string, description: string, created:  string, lastEdit: string) => dispatch(actionCreators.editNote(userId, token, noteId, description, created, lastEdit))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);