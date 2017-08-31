import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers/reducer-index.js'
import thunk from 'redux-thunk'

export default function configureStore(initialState)
{
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunk),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    )

    if (module.hot)
    {
        module.hot.accept('../reducers/reducer-index.js', () => {
            const nextRootReducer = require('../reducers/reducer-index.js').default;
            store.replaceRouter(nextRootReducer);
        })
    }

    return store
}