import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import  './index.css'

class List extends Component {
    // props: ['list']
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    render() {
        return (
            <div className="list">
                <ul>
                    {
                        this.props.list.map(item => {
                            return (
                                <li key={item.name}>
                                    <Link to={item.path}>{item.name}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default List