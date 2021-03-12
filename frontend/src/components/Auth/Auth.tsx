import './Auth.css';
import { useActions } from '../hooks/useActions';
import { useEffect, useState } from 'react';
import { store } from '../../redux';
//import { store } from '../../redux';

const Start: React.FC = (props) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [isSingup, setSingup] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const { auth } = useActions();
    

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        auth(login, password, isSingup);
        setSingup(false);
    }

    let renderContent;

    if( !store.getState().auth.loading ) {
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
        if(!isSingup) {
            setErrorMessage('user not exist');
        }
    },[isSingup]);  
    

    return (
        renderContent
    );
}

export default Start;