import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { actionCreators } from '../../redux';
import OneNotes from './OneNote/OneNote';
import Nav from './Nav/Nav';
import './Notes.css';

const Notes: React.FC<any> = (props) => {
    const { getAllNotes, logout, clearNotes, deleteNote, curentNote } = props;

    const history = useHistory();

    useEffect(() => {
        if (props.token != null && props.userId != null) {
            getAllNotes(props.token, props.userId);
        }        
    }, [getAllNotes]);

    let content;
    
    if (props.loading) {
        content= (<h5>Loading notes ...</h5>);
    }    

    if (props.error) {
        content = (<p className="errorMessage">{ props.error.message }</p>);
    }

    if (props.notes != null) {
        if (new Array(...props.notes).length > 0) {
            content = props.notes.map((note: any) => (<OneNotes key={note.id} 
                    date={Date.parse(note.lastEdit)} 
                    description={note.description} 
                    deleteBtn={(e: any) => {
                        deleteNote(props.token, props.userId, note.id);}}
                    click={() => {
                        curentNote(note.description, note.id, note.created, note.lsatEdit); 
                        history.push("/note", { from: "/" })} }>
                </OneNotes>));
        } else if (!props.loading) {
            content= (<h5>Please create notes </h5>);
        }
    }  

    const logoutFn = () => {
        clearNotes();
        logout();
    }

    return (
        <div className="Notes">
            <Nav addNotesRedirect={() => history.push("/note", { from: "/" })}
                logout={logoutFn}
                chengePassword={() => {console.log('changePassword')}}
            />
            { content }            
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
      loading: state.notes.loading,
      error: state.notes.error,
      isAuthenticated: state.auth.token,
      notes: state.notes.notes,
      token: state.auth.token,
      userId: state.auth.userId
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
      getAllNotes: (token: string, userId: string) => dispatch(actionCreators.getNotes(token, userId)),
      logout: () => dispatch(actionCreators.logout()),
      clearNotes: () => dispatch(actionCreators.clearNotes()),
      deleteNote: (token: string, userId: string, noteId: string) => dispatch(actionCreators.deleteNote(token, userId, noteId)),
      curentNote: (description: string, id: string, created: string, lastEdit: string) => dispatch(actionCreators.setNote(description, id, created, lastEdit))      
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notes);