import React, { Component } from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import { Home, Wallet, Settings, Projects } from '../pages/index';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { BiHomeHeart, BiCog, BiWallet, BiDonateHeart } from 'react-icons/bi'; 
import { IconContext } from 'react-icons/lib';
import '../media/Styles/Style.scss'; 

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight, 
      isLoggedIn: false, 
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {

    return (
      <div classname="app">
        <Router>

          <Route render={({ location, history }) => (
            <React.Fragment>
              <SideNav
                onSelect={(selected) => {
                  const to = '/' + selected;
                  if (location.pathname !== to) {
                    history.push(to);
                  }
                }}
              >
                <SideNav.Toggle />

                <SideNav.Nav defaultSelected="wallet">
                  <NavItem eventKey="home">
                    <NavIcon>
                      <IconContext.Provider value={{ size: '30px' }}>
                        <div>
                          <BiHomeHeart />
                        </div>
                      </IconContext.Provider>
                    </NavIcon>
                    <NavText>
                      Home
                      </NavText>
                  </NavItem>
                  <NavItem eventKey="projects">
                    <NavIcon>
                      <IconContext.Provider value={{ size: '30px' }}>
                        <div>
                          <BiDonateHeart />
                        </div>
                      </IconContext.Provider>
                    </NavIcon>
                    <NavText>
                      Projekte
                      </NavText>
                  </NavItem>
                  <NavItem eventKey="wallet">
                    <NavIcon>
                      <IconContext.Provider value={{ size: '30px' }}>
                        <div>
                          <BiWallet />
                        </div>
                      </IconContext.Provider>
                    </NavIcon>
                    <NavText>
                      Wallet
                      </NavText>
                  </NavItem>
                  <NavItem eventKey="settings">
                    <NavIcon>
                      <IconContext.Provider value={{ size: '30px' }}>
                        <div>
                          <BiCog />
                        </div>
                      </IconContext.Provider>
                    </NavIcon>
                    <NavText>
                      Einstellungen
                      </NavText>
                  </NavItem>
                </SideNav.Nav>
              </SideNav>
              <main>
                <Route path="/home" exact component={props => <Home />} />
                <Route path="/settings" component={props => <Settings />} />
                <Route path="/wallet" component={props => <Wallet />} />
                <Route path="/projects" component={props => <Projects />} />
              </main>
            </React.Fragment>
          )}
          />
        </Router>
      </div>
    )
  }
}

export default App;