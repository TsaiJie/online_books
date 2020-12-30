import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import Home from './containers/Home'
import Create from './containers/Create'


function App(params) {
 return (
   <Router>
    <div className="App">
      <ul>
        <Link to='/'>Home</Link>
        <Link to='/create'>Create</Link>
        <Link to='/edit/10'>Edit</Link>
      </ul>
      <div className="container pb-5">
        {/* exact 是路径完全匹配 */}
        <Route path='/' exact component={Home} />
        <Route path='/create' component={Create} />
        <Route path='/edit/:id' component={Create} />
      </div>
    </div>
   </Router>
 ) 
}
export default App
