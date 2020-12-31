import React, { PureComponent } from 'react'
import CategorySelect from '../components/CategorySelect'
import PriceForm from '../components/PriceForm'
import { Tab, Tabs } from '../components/Tabs'
import { testCategories } from '../testData'
import { TYPE_INCOME, TYPE_OUTCOME } from '../utility'
import { AppContext } from '../App'
import withContext from '../WithContext'
class Create extends PureComponent {
  render() {
    const { data } = this.props
    const filterCategories = testCategories.filter(
      (categroy) => categroy.type === TYPE_OUTCOME
    )
    return (
      <div
        className="create-page py-3 px-3 rounded mt-3"
        style={{ background: '#fff' }}
      >
        <Tabs activeIndex={0} onTabChange={() => {}}>
          <Tab>支出</Tab>
          <Tab>收入</Tab>
        </Tabs>
        <CategorySelect
          categories={filterCategories}
          onSelectCategory={() => {}}
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
