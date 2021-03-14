import './Auth.css';
import { useActions } from '../hooks/useActions';
import { useState } from 'react';
import { store } from '../../redux';
import { useHistory } from 'react-router-dom'; 

const Start: React.FC = (props) => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    
    const [loading, setLoading] = useState(store.getState().auth.loading);
    const { auth } = useActions();
    const history = useHistory();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await auth(login, password); 
        setLoading(store.getState().auth.loading); 
        history.push('/notes');
    }

    let renderContent;

    if( !loading ) {
        renderContent = (
            <div className="Auth">
                <h5>Please login!</h5>       
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
    

    return (
        renderContent
    );
}

export default Start;