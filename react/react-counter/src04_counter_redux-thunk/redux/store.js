/**
 * redux最核心的管理对象：store
 */
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import reducer from './reducer'


// 创建store对象内部会第一次调用reducer得到初始state
export default createStore(reducer, applyMiddleware(thunk))