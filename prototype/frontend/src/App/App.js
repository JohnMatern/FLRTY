import React, { useState, useEffect }  from 'react'; 
import styled, { ThemeProvider } from 'styled-components'; 
import ThemeSelector from '../component/ThemeSelector';

import GlobalFonts from '../media/fonts/fonts';

import WebFont from 'webfontloader';
import { GlobalStyles } from '../media/theme/GlobalStyles';
import {useTheme} from '../media/theme/useTheme';


import { Footer, Header, Main } from '../pages/index';

const Wrapper = styled.section`
  width: 20%; 
  height: 100%; 
  padding: 2em; 
  margin: 6em; 
  text-align: center; 
  background-color: #f7f7f7; 
  border-radius: 20px; 
`

const Container = styled.div`
  margin: 5px auto 5px auto;
`;

function App() {

  // 3: Get the selected theme, font list, etc.
  const {theme, themeLoaded, getFonts} = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  useEffect(() => {
    setSelectedTheme(theme);
   }, [themeLoaded]);

  // 4: Load all the fonts
  useEffect(() => {
    WebFont.load({
      google: {
        families: getFonts()
      }
    });
  });

  // 5: Render if the theme is loaded.
  return (
    <>
    {
      themeLoaded && <ThemeProvider theme={ selectedTheme }>
        <GlobalStyles/>
        <Container style={{fontFamily: selectedTheme.font}}>  
          <Wrapper> 
            <Header /> 
            <Main /> 
            <Footer /> 
          </Wrapper>
          <h1>Theme Builder</h1>
          <p>
            This is a theming system with a Theme Switcher and Theme Builder.
            Do you want to see the source code? <a href="https://github.com/atapas/theme-builder" target="_blank">Click here.</a>
          </p>
          <ThemeSelector setter={ setSelectedTheme } />
        </Container>
      </ThemeProvider>
    }
    </>
  );

}

export default App;