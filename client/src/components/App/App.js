import './App.scss';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Main from '../Main/Main';
import Stats from '../Stats/Stats';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Switch>
            <Route exact path='/' render={ () => <Main />} />
            <Route path='/stats' render={ () => <Stats />} />
            {/* <Route path='/character_data' render={ () => <CharacterData />} /> */}
          </Switch>
      </div>
  </BrowserRouter>
  );
}

export default App;
