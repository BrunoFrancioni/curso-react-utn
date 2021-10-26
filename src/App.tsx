import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/shared/Header/Header';
import MainContent from './components/main/MainContent/MainContent';
import FavoritesList from './components/main/FavoritesList/FavoritesList';
import CharacterDetails from './components/main/CharacterDetails/CharacterDetails';

function App() {
  return (
    <div className="App">
      <Header />
      
      <Router>
        <Switch>
          <Route path='/character/:id'>
            <CharacterDetails />
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
