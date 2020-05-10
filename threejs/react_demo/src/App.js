import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import List from './component/list/index'
import list from './router'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <List list={list}></List>
          {
            list.map(item => {
              return (<Route 
                key={item.name} 
                path={item.path}
                component={item.com}
              >
              </Route>)
            })
          }
        </Router>
      </div>
    )
  }
}

export default App;
