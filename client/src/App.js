import './App.css';
//Me importo mí:
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage";
import Home from './components/home/Home';

//Switch => Solo va a machear las rutas que existan

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/home' component={Home}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
