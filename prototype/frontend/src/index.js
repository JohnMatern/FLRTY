import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import reportWebVitals from './reportWebVitals';

import * as themes from './media/theme/schema.json';
import { setToLS } from './media/theme/storage';

const Index = () => {
  setToLS('all-themes', themes.default);
  return(
    <App />
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
