import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import './NoteForm.css';

const NoteForm: React.FC<any> = (props) => {
  const [description, setDescription] = useState<string>('');
  const [saveToggler, setSaveToggler] = useState<boolean>(false);
  const [saveORback, setsaveORback] = useState<any>('save');
  const [colorBtn, setColorBtn] = useState<any>({background: 'brown'});
  const [changeCheck, setChangeCheck] = useState<boolean>(true);

  const history = useHistory();

  useEffect(() => {
    if (saveToggler === true) {
      setsaveORback(<i className="fas fa-arrow-left"></i>);
      setColorBtn({background: 'green'});
    } else {
      setsaveORback('save');
    }

    if (saveToggler === false && changeCheck === true) {
      setTimeout(() => {
        setSaveToggler(true);
        setColorBtn({background: 'green'});
        setChangeCheck(false);
        console.log('save time');
      }, 5000); //TODO add send change note on server
    }
  }, [saveToggler, changeCheck]);
  

  const handlerSubmit = (event: any) => {
    event.preventDefault();
    console.log("save");

    setSaveToggler(true);
    setChangeCheck(false);
    if (saveToggler === true) {      
      history.push("/", { from: "/note" });
    }
  }

  const textChange = (event: any) => {
    event.preventDefault();
    setDescription(event.target.value);
    if (saveToggler === true) {
      setSaveToggler(false);
      setColorBtn({background: 'brown'});
      
    }
    setChangeCheck(true);
  }

    return (
        <div className="NoteForm">
          <p>Created: 00-00-0000 / Last edit: 00-00-0000 00:00</p>
              <textarea value={description} name="description" onChange={textChange}/>
              <div className="NoteBarr">
                <button className="saveORback" style={colorBtn} onClick={handlerSubmit}>{saveORback}</button>
                <p>save before you go back!</p>
              </div>     
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);