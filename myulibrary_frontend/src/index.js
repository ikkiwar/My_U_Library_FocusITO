import React from 'react';
import ReactDOM from 'react-dom';
import Router from "./components/router"
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import "./assets/style/app.scss";
import allreducers from "./redux/reducers/index";
import {Provider} from "react-redux";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk"
import {createStore , applyMiddleware} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
const middleware = [ thunk, promise];


const store = createStore(allreducers, composeWithDevTools(
    applyMiddleware(...middleware)));


ReactDOM.render(
    <Provider store={store}>
        <Router/>
    </Provider>,
    document.getElementById('root')
);



