import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import PriceList from './components/PriceList'
import ViewTab from './components/ViewTab'
import { LIST_VIEW, CHART_VIEW } from './utility'
import TotalPrice from './components/TotalPrice'
import MonthPicker from './components/MonthPicker'
import React, { PureComponent } from 'react'
const items = [
  {
    id: 1,
    title: '去云南旅游',
    date: '2018-09-10',
    price: 200,
    category: {
      id: '1',
      name: '旅行',
      type: 'outcome',
      iconName: 'ios-plane',
    },
  },
  {
    id: 2,
    title: '去云南旅游',
    date: '2018-09-10',
    price: 400,
    category: {
      id: '1',
      name: '旅行',
      type: 'outcome',
      iconName: 'ios-plane',
    },
  },
]

export default class App extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      year: 2015,
      month: 2,
    }
  }
  render() {
    const { year, month } = this.state
    return (
      <div className="App">
        <header>
          <TotalPrice />
        </header>
        <ViewTab
          activeTab={LIST_VIEW}
          onTabChange={(view) => {
            console.log(view)
          }}
        />
        <PriceList
          items={items}
          onModifyItem={(item) => {
            console.log(item)
          }}
          onDeleteItem={(item) => {
            console.log(item)
          }}
        />
        <MonthPicker
          year={year}
          month={month}
          onChange={(year, month) =>
            this.setState({
              year,
              month,
            })
          }
        />
      </div>
    )
  }
  changeShow(e) {
    this.setState({
      show: !this.state.show,
    })
  }
}
