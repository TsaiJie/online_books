import React, { PureComponent } from 'react'
import PriceList from '../components/PriceList'
import Ionicon from 'react-ionicons'
import { LIST_VIEW, CHART_VIEW, TYPE_OUTCOME, TYPE_INCOME } from '../utility'
import TotalPrice from '../components/TotalPrice'
import MonthPicker from '../components/MonthPicker'
import CreateBtn from '../components/CreateBtn'
import logo from '../logo.svg'
import { Tabs, Tab } from '../components/Tabs'
import withContext from '../WithContext'
import PieChart from '../components/PieChart'
import { withRouter } from 'react-router-dom'
import Loader from '../components/loader'
const tabsText = [LIST_VIEW, CHART_VIEW]
const generateChartDataByCategory = (items, type = TYPE_INCOME) => {
  let categoryMap = {}
  items
    .filter((item) => item.category.type === type)
    .forEach((item) => {
      if (categoryMap[item.cid]) {
        categoryMap[item.cid].value += item.price * 1
        categoryMap[item.cid].items.push(item.id)
      } else {
        categoryMap[item.cid] = {
          name: item.category.name,
          value: item.price * 1,
          items: [item.id],
        }
      }
    })
  return Object.keys(categoryMap).map((mapKey) => ({ ...categoryMap[mapKey] }))
}
export class Home extends PureComponent {
  state = {
    tabView: LIST_VIEW,
  }
  componentDidMount() {
    this.props.actions.getInitalData()
  }
  changeView = (index) => {
    this.setState({ tabView: tabsText[index] })
  }
  changeDate = (year, month) => {
    this.props.actions.selectNewMonth(year, month)
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
    const { items, categories, currentDate, isLoading } = data
    const { tabView } = this.state
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
    const chartOutcomDataByCategory = generateChartDataByCategory(
      itemsWithCategory,
      TYPE_OUTCOME
    )
    const chartIncomDataByCategory = generateChartDataByCategory(
      itemsWithCategory,
      TYPE_INCOME
    )
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
          {isLoading && <Loader />}
          {!isLoading && (
            <React.Fragment>
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
                <React.Fragment>
                  <PieChart
                    categoryData={chartOutcomDataByCategory}
                    title={'支出'}
                    width={400}
                    height={400}
                  />
                  <PieChart
                    categoryData={chartIncomDataByCategory}
                    title={'收入'}
                    width={400}
                    height={400}
                  />
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(withContext(Home))
