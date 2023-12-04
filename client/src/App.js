import './App.css';
//Me importo mí:
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage";
import Home from './components/home/Home';
import Detail from './components/datail/Detail';
import Form from './components/form/Form';
import Error from './components/error404/Error';
import About from './components/about/About';
import axios from 'axios';
axios.defaults.baseURL = 'https://pokemon-go-cpv4.onrender.com';

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
        <Route path='/about' component={About}/>
        <Route path='*' component={Error}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
