import React from "react";
import ReactDOM from "react-dom";
// import {Provider} from 'react-redux';
import { Provider } from "react-redux";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import configureStore from './store/configureStore';

const store = configureStore();

store.subscribe(() => {
 console.log(store.getState());
});

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"));
// registerServiceWorker();
