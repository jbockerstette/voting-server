import makeStore from './src/store';
import startServer from './src/server';

const entries = require('./entries.json');

export const store = makeStore();
startServer(store);

store.dispatch({ type: 'SET_ENTRIES', entries });
store.dispatch({ type: 'NEXT' });

