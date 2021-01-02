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
    console.log('App constructor')
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
        // console.log('isLoading: true')
        // 返回一个Promise， 如果不返回 则不能调用then
        return cb(...args)
      }
    }
    this.actions = {
      getInitalData: withLoading(async () => {
        console.log('APP getInitalData ...')
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
      getEditData: withLoading(async (id) => {
        console.log('APP getEditData ...')
        let promiseArr = [axios.get('/categories')]
        if (id) {
          const getURKWithID = `/items/${id}`
          promiseArr.push(axios.get(getURKWithID))
        }
        const [categories, editItem] = await Promise.all(promiseArr)
        if (id) {
          this.setState({
            categories: flatternArr(categories.data),
            isLoading: false,
            items: { ...this.state.items, [id]: editItem.data },
          })
        } else {
          this.setState({
            categories: flatternArr(categories.data),
            isLoading: false,
          })
        }
        return {
          categories: flatternArr(categories.data),
          editItem: editItem ? editItem.data : null,
        }
      }),
      selectNewMonth: withLoading(async (year, month) => {
        console.log('APP selectNewMonth')
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
        console.log('APP deleteItem')
        const deleteItem = await axios.delete(`/items/${item.id}`)
        const newItems = JSON.parse(JSON.stringify(this.state.items))
        delete newItems[item.id]
        this.setState({
          items: newItems,
          isLoading: false,
        })
        return deleteItem
      }),
      createItem: withLoading(async (data, categoryId) => {
        console.log('APP createItem...')
        const newId = ID()
        const parseDate = parseToYearAndMonth(data.date)
        data.monthCategory = `${parseDate.year}-${parseDate.month}`
        data.timestamp = new Date(data.date).getTime()
        const newItem = await axios.post('/items', {
          ...data,
          id: newId,
          cid: categoryId,
        })
        this.setState({
          items: { ...this.state.items, [newId]: newItem.data },
          isLoading: false,
        })
        return newItem.data
      }),
      updateItem: withLoading(async (item, updatedCategoryId) => {
        console.log('App updateItem...')
        const updateData = {
          ...item,
          cid: updatedCategoryId,
          timestamp: new Date(item.date).getTime(),
        }
        const modifedItem = await axios.put(`/items/${item.id}`, updateData)
        this.setState({
          items: { ...this.state.items, [modifedItem.data.id]: modifedItem.data },
          isLoading: false,
        })

        // this.actions.getInitalData()
        return modifedItem.data
      }),
    }
  }

  render() {
    console.log("APP render...",this.state.items);
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
