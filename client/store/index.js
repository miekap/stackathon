import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import artist from './artist'
import fan from './fan'
import night from './night'
import customers from './customers'

const reducer = combineReducers({artist, fan, night, customers})
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './artist'
export * from './fan'
export * from './night'
export * from './customers'
