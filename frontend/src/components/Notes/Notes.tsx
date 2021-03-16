import { connect } from 'react-redux';
import { actionCreators } from '../../redux';
import './Notes.css';

const Notes: React.FC<any> = (props) => {

    let content: any = (<h5>Loading notes ...</h5>);

    if (props.error) {
        content = (<p className="errorMessage">{ props.error }</p>);
    }

    if (!props.loading) {
        content = props.notes.map((note: any) => (<div key={note.id}>{ note.id }</div>));
    }
    

    return (
        <div className="Notes">
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
      getAllNotes: (token: string, userId: string) => dispatch(actionCreators.getNotes(token, userId))       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notes);