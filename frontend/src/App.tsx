import React, { Suspense } from 'react';
import { Route, Switch, withRouter, Redirect, Router } from 'react-router-dom';
import './App.css';

class App extends React.Component {
  componentDidMount() {
  }

  render() {

    let router = (
    <Switch>
      <Route path="/auth" />
      <Route path="/" exact />
      <Redirect to="/" />
    </Switch>);

    return (
      <div>
        {router}
      </div>
    )
  };
}

export default App;
