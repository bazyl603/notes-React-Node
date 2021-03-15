import './Auth.css';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { useActions } from '../hooks/useActions';

const Auth: React.FC<any> = (props) => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { auth } = useActions();

    const handlerSubmit = (event: any) => {
        event.preventDefault();
        auth(login, password);
    }

    let renderContent;
    renderContent= (
        <div className="Auth">
            <h5>Please login!</h5>       
            <form onSubmit={handlerSubmit}>
                <label>login:</label>
                <input value={login} type="text" placeholder="Login" name="login" onChange={(e) => setLogin(e.target.value)}/>
                <label>password:</label>
                <input value={password} type="password" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                <button>Login</button>
            </form>            
        </div>
        );

    if(props.loading){
        renderContent = (
            <div className="Auth">
                <h4>Please be patient!</h4>  
                <h5>Loading...</h5>                    
            </div>
        );
    }

    let errorMessage
    if (props.error) {
        errorMessage = (
            <div className="errorMessage">
                {props.error}
            </div>
        );
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />;
    }

    return (
    <div className="Auth">
        {authRedirect}
        {errorMessage}        
        {renderContent}
    </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
      loading: state.auth.loading,
      error: state.auth.error,
      isAuthenticated: state.auth.token !== null,
      authRedirectPath: state.auth.authRedirectPath
    };
  };

export default connect(mapStateToProps)(Auth);