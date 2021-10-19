import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/shared/Header/Header';
import MainContent from './components/main/MainContent/MainContent';
import CoinDetails from './components/main/CoinDetails/CoinDetails';
import FavoritesList from './components/main/FavoritesList/FavoritesList';

function App() {
  return (
    <div className="App">
      <Header />
      
      <Router>
        <Switch>
          <Route path='/coin/:id'>
            <CoinDetails />
          </Route>

          <Route path='/favorites'>
            <FavoritesList />
          </Route>

          <Route exact path='/'>
            <MainContent />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
