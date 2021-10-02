import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppContextProvider } from './context/appContext/AppContext';
import { AddContextProvider } from './context/storemapcontext/AddContext';

import Topbar from './components/topbar/Topbar';
import Home from './pages/home/Home';
import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup';
import Profile from './pages/profile/Profile';
import PrivateRoute from './components/routing/PrivateRoute';
import Createstore from './pages/createstore/Createstore';
import Product from './pages/addproduct/Product';
import Userdashboard from './pages/userdashboard/Userdashboard';
import Storedashboard from './pages/storedashboard/Storedashboard';
import AllProduct from './pages/allproduct/AllProduct';
import Analytics from './pages/analytics/Analytics';
import Orders from './pages/orders/Orders';


function App() {
  return (
    <AppContextProvider>
      <AddContextProvider>
        <div className="App">
          <BrowserRouter>
            <Topbar />
            <div className="appWrapper">
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/signup" component={Signup} />
                <PrivateRoute exact path="/storedashboard/allProduct" component={AllProduct} />
                {/* <PrivateRoute exact path="/storedashboard/analytics" component={Analytics} /> */}
                <PrivateRoute exact path="/storedashboard/orders" component={Orders} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute exact path="/createstore/:userid" component={Createstore} />
                <PrivateRoute exact path="/addproduct" component={Product} />
                <PrivateRoute exact path="/userdashboard/:id" component={Userdashboard} />
                <PrivateRoute exact path="/storedashboard/:id" component={Storedashboard} />
                
                
                 
              </Switch>
            </div>
          </BrowserRouter>
        </div>
      </AddContextProvider>
    </AppContextProvider>
  );
}

export default App;
