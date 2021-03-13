import './Auth.css';
import { useActions } from '../hooks/useActions';
import { useEffect, useState } from 'react';
import { store } from '../../redux';
//import { useHistory } from 'react-router-dom'; TODO add redirect and fixing error message

const Start: React.FC = (props) => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>('');
    const [loading, setLoading] = useState(store.getState().auth.loading);
    const { auth } = useActions();
    //const history = useHistory();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        auth(login, password);
        setErrorMessage(store.getState().auth.error);
                
    }

    let renderContent;

    if( !loading ) {
        renderContent = (
            <div className="Auth">
                <h5>Please login!</h5>
                <div className={errorMessage ? 'errorMessage' : ''}>{errorMessage}</div>            
                <form onSubmit={handleSubmit}>
                    <label>login:</label>
                    <input value={login} type="text" placeholder="Login" name="login" onChange={(e) => setLogin(e.target.value)}/>
                    <label>password:</label>
                    <input value={password} type="password" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                    <button>Login</button>
                </form>            
            </div>
        );
    } else {
        renderContent = (
            <div className="Auth">
                <h4>Please be patient!</h4>  
                <h5>Loading...</h5>                    
            </div>
        );
    }    

    useEffect(() => {
        if (store.getState().auth.loading === false) {
            setLoading(store.getState().auth.loading);
        }
    },[loading]);  
    

    return (
        renderContent
    );
}

export default Start;