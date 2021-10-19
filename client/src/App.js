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
import Singleproduct from './pages/singleproduct/Singleproduct';
import Addtocartpage from './pages/addtocartpage/Addtocartpage';
import { CartContextProvider } from './context/cartContext/CartContext';
import Orderhistory from './pages/orderhistory/Orderhistory';
import { DrawerContextProvider } from './context/DrawerContext';



function App() {
  return (
    <AppContextProvider>
      <AddContextProvider>
        <DrawerContextProvider>
          <CartContextProvider>
            <div className="App">
              <BrowserRouter>
                <Topbar />
                <div className="appWrapper">
                  <Switch>
                    <PrivateRoute exact path="/" component={Home} />
                    <Route exact path="/signin" component={Signin} />
                    <Route exact path="/signup" component={Signup} />

                    <PrivateRoute exact path="/product/:productId" component={Singleproduct} />

                    <PrivateRoute exact path="/createstore/:userid" component={Createstore} />
                    <PrivateRoute exact path="/addproduct" component={Product} />

                    <PrivateRoute exact path="/userdashboard/:page" component={Userdashboard} />

                    <PrivateRoute exact path="/storedashboard/:page" component={Storedashboard} />

                    {/* <PrivateRoute exact path="/addtocart" component={Addtocartpage} /> */}

                  </Switch>
                </div>
              </BrowserRouter>
            </div>
          </CartContextProvider>
        </DrawerContextProvider>
      </AddContextProvider>
    </AppContextProvider>
  );
}

export default App;
