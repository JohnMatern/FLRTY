import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Footer, Header, Main, Wallet, Settings, Projects } from '../pages/index';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { BiHomeHeart, BiCog, BiWallet, BiDonateHeart } from 'react-icons/bi'
import { IconContext } from 'react-icons/lib';

const Wrapper = styled.section`
  width: 30%; 
  background-color: #119962; 
  border-radius: 20px; 
  text-align: center; 
  margin-left: 650px; 
  padding: 2em; 
  font-family: sans-serif; 
`

const Page = styled.section`
  width: ${props => props.width}; 
  height: ${props => props.height}; 
  background-color: black; 
  padding: 1em; 
`

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight
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
      <Page width={this.state.width} height={this.state.height}>
        <Wrapper>
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

                  <SideNav.Nav defaultSelected="home">
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
                  <Route path="/home" exact component={props => <Main />} />
                  <Route path="/settings" component={props => <Settings />} />
                  <Route path="/wallet" component={props => <Wallet />} />
                  <Route path="/projects" component={props => <Projects />} />
                </main>
              </React.Fragment>
            )}
            />
          </Router>
          <Grid
            container
            direction='column'
            justify='center'
            alignItems='center'
          >
            <Grid item xs={12}>
              <Header />
            </Grid>

            <Grid item xs={12}>
              <Main />
            </Grid>

            <Grid item xs={12}>
              <Footer />
            </Grid>
          </Grid>
        </Wrapper>
      </Page>
    )
  }
}

export default App;