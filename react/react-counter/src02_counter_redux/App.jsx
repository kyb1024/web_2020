import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {increment, decrement} from './redux/actions'


export default class App extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)
        // 通过在class中使用React.createRef()方法创建一些变量，可以将这些变量绑定到标签的ref中
        // 那么该变量的current则指向绑定的标签dom
        this.numberRef = React.createRef()
    }

    increment = () => {
        const number = this.numberRef.current.value * 1
        this.props.store.dispatch(increment(number))
    }

    decrement = () => {
        const number = this.numberRef.current.value * 1
        this.props.store.dispatch(decrement(number))
    }

    incrementIfOdd = () => {
        const number = this.numberRef.current.value * 1
        if(this.props.store.getState() % 2 === 1) {
            this.props.store.dispatch(increment(number))
        }
    }

    incrementAsync = () => {
        const number = this.numberRef.current.value * 1
        setTimeout(() => {
            this.props.store.dispatch(increment(number))
        }, 1000)
    }

    render() {
        const count = this.props.store.getState()

        return (
            <div>
                <p>click {count} times</p>
                <div>
                    <select ref={this.numberRef}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select> &nbsp;&nbsp;
                    <button onClick={this.increment}>+</button>&nbsp;&nbsp;
                    <button onClick={this.decrement}>-</button>&nbsp;&nbsp;
                    <button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;&nbsp;
                    <button onClick={this.incrementAsync}>increment async</button>
                </div>
            </div>
        )
    }
}