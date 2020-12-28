import React, { PureComponent } from 'react'
import PriceList from '../components/PriceList'
import ViewTab from '../components/ViewTab'
import { LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME } from '../utility'
import TotalPrice from '../components/TotalPrice'
import MonthPicker from '../components/MonthPicker'
import CreateBtn from '../components/CreateBtn'
import logo from '../logo.svg'
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
  {
    id: 3,
    title: '理财收入',
    date: '2018-09-10',
    price: 400,
    category: {
      id: '1',
      name: '旅行',
      type: 'income',
      iconName: 'ios-money',
    },
  },
]

export default class Home extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      year: 2015,
      month: 2,
    }
  }
  render() {
    const { year, month } = this.state
    let totalIncome = 0,
      totalOutcome = 0
    items.forEach((item) => {
      if (item.category.type === TYPE_OUTCOME) {
        totalOutcome += item.price
      } else {
        totalIncome += item.price
      }
    })
    return (
      <React.Fragment>
        <header className="App-header">
          <div className="row mb-5 justify-content-center">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div className="row">
            <div className="col">
              <MonthPicker
                year={year}
                month={month}
                onChange={(year, month) => this.setState({ month, year })}
              />
            </div>
            <div className="col">
              <TotalPrice income={totalIncome} outcome={totalOutcome} />
            </div>
          </div>
        </header>
        <div className="content-area py-3 px-3">
          <ViewTab activeTab={LIST_VIEW} onTabChange={() => {}}></ViewTab>
          <CreateBtn onClick={() => {}} />
          <PriceList
            items={items}
            onModifyItem={() => {}}
            onDeleteItem={() => {}}
          />
        </div>
      </React.Fragment>
    )
  }
}
