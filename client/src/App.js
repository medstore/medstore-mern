import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Topbar from './components/topbar/Topbar';
import Home from './pages/home/Home';
import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Topbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
