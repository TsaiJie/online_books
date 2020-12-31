import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './containers/Home'
import Create from './containers/Create'
import { testItems, testCategories } from './testData'
import { flatternArr } from './utility'

export const AppContext = React.createContext()

class App extends PureComponent {
  state = {
    // 数据扁平化，以id作为key
    items: flatternArr(testItems),
    categories: flatternArr(testCategories),
  }
  render() {
    return (
      <AppContext.Provider value={{
        state: this.state
      }}>
        <Router>
          <div className="App">
            <ul>
              <Link to="/">Home</Link>
              <Link to="/create">Create</Link>
              <Link to="/edit/10">Edit</Link>
            </ul>
            <div className="container pb-5">
              {/* exact 是路径完全匹配 */}
              <Route path="/" exact component={Home} />
              <Route path="/create" component={Create} />
              <Route path="/edit/:id" component={Create} />
            </div>
          </div>
        </Router>
      </AppContext.Provider>
    )
  }
}
export default App
