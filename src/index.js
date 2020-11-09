import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ImageClassification from './components/ImgClassification';

ReactDOM.render(
  <React.StrictMode>
		<App />
		<ImageClassification />
  </React.StrictMode>,
  document.getElementById('root')
);

const element = React.createElement(
	'h1',
	{className:'img'},
	'Image Classification with ML5.js'
);
ReactDOM.render(element, document.getElementById('title'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
