import Store, { Context } from './utils/Store'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import { Box } from "@material-ui/core";
import IsLoggedin from './utils/IsLoggedin'
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Login, Home, AddUsername, Register, Wallet, Menu, ProjectPage } from "./pages/index";
import { Container, Row, Col } from 'react-bootstrap';
import './style.scss';

const App = () => {
  const { state, dispatch } = useContext(Context);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)

  useEffect(async () => {

  });

  const handleResize = () => {
    setWindowHeight(window.innerHeight)
  }
  window.addEventListener('resize', handleResize)
  return (
    <div className="app">
      <Store>
        <Box className="appBox" style={{ width: "400px", padding: "10px", minHeight: windowHeight }}>
          <Container fluid className="d-flex flex-column h-100">
            <Row>
              <Col className="border-bottom">
                <Header />
              </Col>
            </Row>
            <BrowserRouter>
              <Row className="h-100" style={{ fontSize: "10px", marginTop:"10px" }}>
                <Col className="h-100">
                  <center>

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

                      <Route exact path="/register">
                        <Register />
                      </Route>

                      <Route path="/menu">
                        <Menu />
                      </Route>

                      <Route exact path="/wallet">
                        <Wallet />
                      </Route>

                      <Route path="/project/:address">
                        <ProjectPage />
                      </Route>

                    </Switch>
                  </center>
                </Col>
              </Row>
              <Row>
                <Col className="mt-auto border-top"
                  style={{ height: "40px" }}>
                  <Footer />
                </Col>
              </Row>
            </BrowserRouter>
          </Container>
        </Box>
      </Store>
    </div>
  );
}

export default App;