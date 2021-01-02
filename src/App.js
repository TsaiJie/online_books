import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './containers/Home'
import Create from './containers/Create'
import { flatternArr, ID, parseToYearAndMonth } from './utility'
import axios from 'axios'
export const AppContext = React.createContext()

class App extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      // 数据扁平化，以id作为key
      items: {},
      categories: {},
      isLoading: false,
      currentDate: parseToYearAndMonth('2018/11/10'),
    }
    const withLoading = (cb) => {
      return (...args) => {
        this.setState({
          isLoading: true,
        })
        // 返回一个Promise， 如果不返回 则不能调用then
        return cb(...args)
      }
    }
    this.actions = {
      getInitalData: withLoading(async () => {
        const { currentDate } = this.state
        const getUrlWithData = `/items?monthCategory=${currentDate.year}-${currentDate.month}&_sort=timestamp&_order=desc`
        const results = await Promise.all([
          axios.get('/categories'),
          axios.get(getUrlWithData),
        ])
        const [categories, items] = results
        this.setState({
          items: flatternArr(items.data),
          categories: flatternArr(categories.data),
          isLoading: false,
        })
        return items
      }),
      selectNewMonth: withLoading(async (year, month) => {
        this.setState({
          isLoading: true,
        })
        const getUrlWithData = `/items?monthCategory=${year}-${month}&_sort=timestamp&_order=desc`
        const items = await axios.get(getUrlWithData)
        this.setState({
          items: flatternArr(items.data),
          currentDate: { year, month },
          isLoading: false,
        })
        return items
      }),
      deleteItem: withLoading(async (item) => {
        const deleteItem = await axios.delete(`/items/${item.id}`)
        const newItems = JSON.parse(JSON.stringify(this.state.items))
        delete newItems[item.id]
        this.setState({
          items: newItems,
          isLoading: false,
        })
        return deleteItem
      }),
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
