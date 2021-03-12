import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useActions } from './hooks/useActions';
import './App.css';

const Start = React.lazy(() => import('./Start/Start'));
const Auth = React.lazy(() => import('./Auth/Auth'));

const App: React.FC = () => {
  const { authCheckState } = useActions();

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/" exact component={Start} />
      <Redirect to="/" />
    </Switch>
  );

  if (authCheckState()) {
    routes = (      
      <Switch>
        <Route path="/" exact render={() => <h1>Notes</h1>} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div className="App">
      {routes}
    </div>
  );
}

export default App;
