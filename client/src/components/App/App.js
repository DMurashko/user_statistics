import './App.scss';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Main from '../Main/Main';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Switch>
            <Route exact path='/' render={ () => <Main />} />
            {/* <Route path='/characters' render={ () => <Characters />} /> */}
            {/* <Route path='/character_data' render={ () => <CharacterData />} /> */}
          </Switch>
      </div>
  </BrowserRouter>
  );
}

export default App;
