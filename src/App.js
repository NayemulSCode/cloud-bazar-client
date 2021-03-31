import './App.css';
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home/Home'
import Order from './components/Order/Order';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import AddProduct from './components/AddProduct/AddProduct';
import CartItem from './components/CartItem/CartItem';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Button from '@material-ui/core/Button';
import { handleSignOut } from './components/Login/ManageLogin';
//material ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//end material ui
export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  //logout
  const signOut = () => {
    handleSignOut()
    .then(res => {
        handleResponse(res);
    })
  }
  const handleResponse = res=>{
    setLoggedInUser(res)
  }
  //material ui function
  
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]} >
    <Router>
    <AppBar className="navBar" position="static">
        <Toolbar className="navItems">
          <Typography className="navItem" variant="h6">
            <Link className="navItemLink" to="/">Home</Link>
          </Typography>
          <Typography variant="h6">
            <Link className="navItemLink" to="/order">Order</Link>
          </Typography>
            <Typography variant="h6">
          <Link className="navItemLink" to="/dashboard">Dashboard</Link>
          </Typography>
            <Typography variant="h6">
          <Link className="navItemLink" to="/addProduct">Add Product</Link>
          </Typography>
          <Typography variant="h6" color="inherit">
            <Link className="navItemLink" to="/login">{loggedInUser.email? <Button onClick={signOut}>Logout</Button>:<Button>Login</Button>}</Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute path="/order">
            <Order />
          </PrivateRoute>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <Route path="/addProduct">
            <AddProduct />
          </Route>
          <PrivateRoute path="/cartItem/:id">
            <CartItem />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
