import React from 'react'

import Counter from '../components/Counter'
import { connect } from 'react-redux'

import {increment, decrement, incrementAsync} from '../redux/actions'


// 容器组件，向UI组件传入特定的属性

export default connect(
    state => ({count: state}),
    {increment, decrement, incrementAsync}
)(Counter)