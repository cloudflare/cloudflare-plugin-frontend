import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];

export default state => configureStore(middlewares)(state);
