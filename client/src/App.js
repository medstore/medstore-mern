import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppContextProvider } from './context/appContext/AppContext';

import Topbar from './components/topbar/Topbar';
import Home from './pages/home/Home';
import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup';
import Profile from './pages/profile/Profile';
import PrivateRoute from './components/routing/PrivateRoute';
import Createstore from './pages/createstore/Createstore';

function App() {
  return (
    <AppContextProvider>
      <div className="App">
        <BrowserRouter>
          <Topbar />
          <div className="appWrapper">
            <Switch>
              <PrivateRoute exact path="/" component={Home}/>
              <Route exact path="/signin" component={Signin} />
              <Route exact path="/signup" component={Signup} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/createstore" component={Createstore} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    </AppContextProvider>
  );
}

export default App;
