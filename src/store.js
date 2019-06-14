import {applyMiddleware, compose, createStore} from "redux";
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {StateLoader} from "./utils/StateLoader";

// const initalState = {};

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const stateLoader = new StateLoader();

const store = createStore(rootReducer,
    stateLoader.loadState(),
    composeEnhancers(
        applyMiddleware(...middleware)
    ));

store.subscribe(() => {
    stateLoader.saveState(store.getState());
});

export default store;