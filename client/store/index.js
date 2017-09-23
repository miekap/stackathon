import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import artist from './artist'
import night from './night'
import fan from './fan'

const reducer = combineReducers({artist, night, fan})
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './artist'
export * from './night'
export * from './fan'
