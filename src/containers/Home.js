import React, { PureComponent } from 'react'
import PriceList from '../components/PriceList'
import Ionicon from 'react-ionicons'
import {
  LIST_VIEW,
  CHART_VIEW,
  TYPE_INCOME,
  TYPE_OUTCOME,
  parseToYearAndMonth,
  padLeft,
} from '../utility'
import TotalPrice from '../components/TotalPrice'
import MonthPicker from '../components/MonthPicker'
import CreateBtn from '../components/CreateBtn'
import logo from '../logo.svg'
import { Tabs, Tab } from '../components/Tabs'
import withContext from '../WithContext'
import { withRouter } from 'react-router-dom'

const tabsText = [LIST_VIEW, CHART_VIEW]
class Home extends PureComponent {
  state = {
    currentDate: parseToYearAndMonth('2020/12/10'),
    tabView: LIST_VIEW,
  }
  changeView = (index) => {
    this.setState({ tabView: tabsText[index] })
  }
  changeDate = (year, month) => {
    this.setState({ currentDate: { year, month } })
  }
  createItem = () => {
    this.props.history.push('/create')
  }
  modifyItem = (modifiedItem) => {
    this.props.history.push(`/edit/${modifiedItem.id}`)
  }
  deleteItem = (deletedItem) => {
    this.props.actions.deleteItem(deletedItem)
  }

  render() {
    const { data } = this.props
    const { items, categories } = data
    const { currentDate, tabView } = this.state
    // 把items和category给链接起来 生成新的数据
    const itemsWithCategory = Object.keys(items).map((id) => {
      items[id].category = categories[items[id].cid]
      return items[id]
    })

    let totalIncome = 0,
      totalOutcome = 0
    itemsWithCategory.forEach((item) => {
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
                year={currentDate.year}
                month={currentDate.month}
                onChange={this.changeDate}
              />
            </div>
            <div className="col">
              <TotalPrice income={totalIncome} outcome={totalOutcome} />
            </div>
          </div>
        </header>
        <div className="content-area py-3 px-3">
          <Tabs activeIndex={0} onTabChange={this.changeView}>
            <Tab>
              <Ionicon
                className="rounded-circle mr-2"
                fontSize="25px"
                color={'#007bff'}
                icon={'ios-paper'}
              />
              列表模式
            </Tab>
            <Tab>
              <Ionicon
                className="rounded-circle mr-2"
                fontSize="25px"
                color={'#007bff'}
                icon={'ios-pie'}
              />
              图表模式
            </Tab>
          </Tabs>
          <CreateBtn onClick={this.createItem} />
          {tabView === LIST_VIEW && (
            <PriceList
              items={itemsWithCategory}
              onModifyItem={this.modifyItem}
              onDeleteItem={this.deleteItem}
            />
          )}
          {tabView === CHART_VIEW && (
            <h1 className="chart-title">这里是图表区域</h1>
          )}
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(withContext(Home))
