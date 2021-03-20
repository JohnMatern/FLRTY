import { React, Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import { Footer, Header, Main, Wallet, Settings, Projects } from '../pages/index';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';

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
          <Router basename='/home'>


            <Switch>
              <Route
                exact path='/projects'
                render={() => 
                  <Projects /> 
                }
              />
              <Route
                exact path='/wallet'
                render={() => 
                  <Projects /> 
                }
              />
              <Route
                exact path='/settings'
                render={() => 
                  <Projects /> 
                }
              />
            </Switch>
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