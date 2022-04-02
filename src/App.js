import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Index from './components/Index'

class App extends Component
{
    render() {
        return(
          <Router>
            <div className="container">
              <Switch>
                <Route path='/' component={Index} exact/>
              </Switch>
            </div>
          </Router>
        )
    }
}
export default App