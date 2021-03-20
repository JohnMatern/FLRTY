import { createGlobalStyle } from 'styled-components'; 

import AtakBold from './AtakBold-Web.woff'; 
import AtakBold2 from './AtakBold-Web.woff2'; 

import AtakMedium from './AtakMedium-Web.woff'; 
import AtakSemibold from './AtakSemibold-Web.woff'; 
import AtakItalic from './AtakMedium-Italic-Web.woff'; 

export default createGlobalStyle`
    @font-face {
        font-family: 'Atak Bold';
        src: local('Atak Bold'), local('AtakBold'),
        url(${AtakBold2}) format('woff2'),
        url(${AtakBold}) format('woff');
        font-weight: 600;
        font-style: bold;
    }
`;