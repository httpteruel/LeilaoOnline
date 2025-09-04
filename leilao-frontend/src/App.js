    import React from 'react';
    import { Switch, Route } from 'react-router-dom';
    import HomePage from './pages/HomePage';
    import LoginPage from './pages/LoginPage';
    import CadastroPage from './pages/CadastroPage';

    function App() {
      return (
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/cadastro" component={CadastroPage} />
        </Switch>
      );
    }

    export default App;
    
