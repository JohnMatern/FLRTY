import Store, { Context } from './utils/Store'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import { Box } from "@material-ui/core";
import IsLoggedin from './utils/IsLoggedin'
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Login, Home, AddUsername, Register, Wallet, Menu, ProjectPage, NewProject, NewGroup, MyProjects, MyGroups } from "./pages/index";
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
        <Box className="appBox" style={{ width: "400px", padding: "0px", minHeight: windowHeight, backgroundColor: "white" }}>
          <Container fluid className="d-flex flex-column h-100">
            <Row>
              <Col className="border-bottom">
                <Header />
              </Col>
            </Row>
            <BrowserRouter>
              <Row className="h-100" style={{ fontSize: "10px", marginTop: "10px", marginBottom: "50px" }}>
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

                      <Route path="/myProjects">
                        <MyProjects />
                      </Route>

                      <Route path="/myGroups">
                        <MyGroups />
                      </Route>

                    </Switch>
                  </center>
                </Col>
              </Row>
              <Row>
                <Col className=""
                  style={{ height: "40px", bottom: "0", margin: "0", padding: "0", position: "fixed", width: "400px", backgroundColor: "white" }}>
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