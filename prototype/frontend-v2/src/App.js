import Store, { Context } from './utils/Store'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { Box } from "@material-ui/core";
import IsLoggedin from './utils/IsLoggedin'
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Login, Home, AddUsername } from "./pages/index"
import './style.scss';

const App = () => {
  const { state, dispatch } = useContext(Context);

  useEffect(async () => {
    console.log(state)
  });

  return (
    <div className="app">
      <Store>
        <Box className="appBox">
          <Header />

          <BrowserRouter>
            <IsLoggedin />
            <Switch>
              <Route exact path="/login">
                <Login />
              </Route>

              <Route exact path="/">
                <Home />
              </Route>

              <Route exact path="/addUsername">
              <AddUsername />
              </Route>

              <Route path="/menu">
                <div>Menu</div>
              </Route>

            </Switch>
          </BrowserRouter>

          <Footer />
        </Box>
      </Store>
    </div>
  );
}

export default App;