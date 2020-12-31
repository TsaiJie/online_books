import React, { PureComponent } from 'react'
import CategorySelect from '../components/CategorySelect'
import PriceForm from '../components/PriceForm'
import { Tab, Tabs } from '../components/Tabs'
import { testCategories } from '../testData'
import { TYPE_INCOME, TYPE_OUTCOME } from '../utility'
import { AppContext } from '../App'
import withContext from '../WithContext'
const tabsText = [TYPE_OUTCOME, TYPE_INCOME]
class Create extends PureComponent {
  state = {
    selectedTab: TYPE_OUTCOME,
    selectedCategory: null,
  }
  tabChange = (index) => {
    this.setState({
      selectedTab: tabsText[index],
    })
  }
  render() {
    const { data } = this.props
    const { items, categories } = data
    const { selectedTab } = this.state
    const filterCategories = Object.keys(categories)
    .filter(id => categories[id].type === selectedTab)
    .map(id => categories[id])

    return (
      <div
        className="create-page py-3 px-3 rounded mt-3"
        style={{ background: '#fff' }}
      >
        <Tabs activeIndex={0} onTabChange={this.tabChange}>
          <Tab>支出</Tab>
          <Tab>收入</Tab>
        </Tabs>
        <CategorySelect
          categories={filterCategories}
          onSelectCategory={(e) => {console.log(e)}}
        />
        <PriceForm
          onFormSubmit={(a, b) => {
            console.log(a, b)
          }}
          onCancelSubmit={(e) => {
            console.log(e)
          }}
        />
      </div>
    )
  }
}

export default withContext(Create)
