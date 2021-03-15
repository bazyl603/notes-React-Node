import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import './App.css';
import { actionCreators } from '../redux';

const Start = React.lazy(() => import('./Start/Start'));
const Auth = React.lazy(() => import('./Auth/Auth'));

const App: React.FC<any> = (props) => {
  const { onTryAutoSignup } = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);
  
  let routes = (
    <Switch>
      <Route path="/auth" render={props => <Auth {...props} />} />
      <Route path="/" exact component={Start} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (      
      <Switch>
        <Route path="/auth" render={props => <Auth {...props} />} /> 
        <Route path="/" exact render={() => <h1>Notes</h1>} />                 
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div className="App">
      <React.Suspense fallback={<p>Loading...</p>}>{routes}</React.Suspense>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: state.auth.token
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onTryAutoSignup: () => dispatch(actionCreators.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
