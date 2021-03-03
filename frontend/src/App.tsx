import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

class App extends React.Component {
  componentDidMount() {
  }

  render() {

    let router = (
    <Switch>
      <Route path="/auth" />
      <Route path="/" exact render={() => <h1>xxx</h1>} />
      <Redirect to="/" />
    </Switch>);

    return (
      <div>
        {router} xxx
      </div>
    )
  };
}

export default App;