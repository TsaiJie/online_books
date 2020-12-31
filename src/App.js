import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './containers/Home'
import Create from './containers/Create'
import { testItems, testCategories } from './testData'
import { flatternArr, ID, parseToYearAndMonth } from './utility'

export const AppContext = React.createContext()

class App extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      // 数据扁平化，以id作为key
      items: flatternArr(testItems),
      categories: flatternArr(testCategories),
    }
    this.actions = {
      deleteItem: (item) => {
        const newItems = JSON.parse(JSON.stringify(this.state.items))
        delete newItems[item.id]
        this.setState({
          items: newItems,
        })
      },
      createItem: (data, categoryId) => {
        const newId = ID()
        const parseDate = parseToYearAndMonth(data.date)
        data.monthCategory = `${parseDate.year}-${parseDate.month}`
        data.timestamp = new Date(data.date).getTime()
        const newItem = { ...data, id: newId, cid: categoryId }
        this.setState({
          items: { ...this.state.items, [newId]: newItem },
        })
      },
      updateItem: (item, updatedCategoryId) => {
        const modifedItem = {
          ...item,
          cid: updatedCategoryId,
          timestamp: new Date(item.date).getTime(),
        }
        this.setState({
          items: { ...this.state.items, [modifedItem.id]: modifedItem },
        })
      },
    }
  }

  render() {
    return (
      <AppContext.Provider
        value={{
          state: this.state,
          actions: this.actions,
        }}
      >
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
