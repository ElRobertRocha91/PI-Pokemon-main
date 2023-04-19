import './App.css';
//Me importo mí:
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage";
import Home from './components/home/Home';
import Detail from './components/datail/Detail';
import Form from './components/form/Form';

//Switch => Solo va a machear las rutas que existan

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/home' component={Home}/>
        <Route path='/detail/:id' component={Detail}/>
        <Route path='/createPokemons' component={Form}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
