import React from 'react'

import CommentAdd from '../comment-add/comment-add'
import CommentList from '../comment-list/comment-list'


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: []
        }
        this.delete = this.delete.bind(this)
    }

    add = (comment) => {
        let comments = this.state.comments
        comments.unshift(comment)
        this.setState({comments})
    }

    delete(index) {
        let comments = this.state.comments
        comments.splice(index, 1)
        this.setState({comments})
    }

    render() {
        return (
            <div>
                <header className="site-header jumbotron">
                <div className="container">
                    <div className="row">
                    <div className="col-xs-12">
                        <h2>请发表对React的评论</h2>
                    </div>
                    </div>
                </div>
                </header>
                <div className="container">
                    <CommentAdd add={this.add} />
                    <CommentList comments={this.state.comments} delete={this.delete} />
                </div>
            </div>
        )
    }
}

export default App