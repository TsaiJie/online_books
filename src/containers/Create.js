import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import CategorySelect from '../components/CategorySelect'
import PriceForm from '../components/PriceForm'
import { Tab, Tabs } from '../components/Tabs'
import { TYPE_INCOME, TYPE_OUTCOME } from '../utility'
import withContext from '../WithContext'

const tabsText = [TYPE_OUTCOME, TYPE_INCOME]

export class Create extends PureComponent {
  constructor(props) {
    super(props)
    const { categories, items } = props.data
    const { id } = props.match.params
    this.state = {
      selectedTab:
        (id && items[id]) ? categories[items[id].cid].type : TYPE_OUTCOME,
      selectedCategory: (id && items[id]) ? categories[items[id].cid] : null,
    }
  }
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.actions.getEditData(id).then((data) => {
      const { editItem, categories } = data
      this.setState({
        selectedTab:
          (id && editItem) ? categories[editItem.cid].type : TYPE_OUTCOME,
        selectedCategory: (id && editItem) ? categories[editItem.cid] : null,
      })
    })
  }
  tabChange = (index) => {
    this.setState({
      selectedTab: tabsText[index],
    })
  }
  cancelSubmit = () => {
    this.props.history.push('/')
  }
  submitForm = (item, isEditMode) => {
    if (!this.state.selectedCategory) {
      return
    }
    if (!isEditMode) {
      // create
      this.props.actions
        .createItem(item, this.state.selectedCategory.id)
        .then(() => {
          this.props.history.push('/')
        })
    } else {
      // update
      this.props.actions
        .updateItem(item, this.state.selectedCategory.id)
        .then(() => {
          this.props.history.push('/')
        })
    }
  }
  selectedCategory = (category) => {
    this.setState({
      selectedCategory: category,
    })
  }
  render() {
    const { data } = this.props
    const { items, categories } = data
    const { selectedTab, selectedCategory } = this.state
    const { id } = this.props.match.params
    const editItem = id && items[id] ? items[id] : {}
    const filterCategories = Object.keys(categories)
      .filter((id) => categories[id].type === selectedTab)
      .map((id) => categories[id])
    const tabIndex = tabsText.findIndex((text) => text === selectedTab)
    return (
      <div
        className="create-page py-3 px-3 rounded mt-3"
        style={{ background: '#fff' }}
      >
        <Tabs activeIndex={tabIndex} onTabChange={this.tabChange}>
          <Tab>支出</Tab>
          <Tab>收入</Tab>
        </Tabs>
        <CategorySelect
          selectedCategory={selectedCategory}
          categories={filterCategories}
          onSelectCategory={this.selectedCategory}
        />
        <PriceForm
          item={editItem}
          onFormSubmit={this.submitForm}
          onCancelSubmit={this.cancelSubmit}
        />
        {!this.state.selectedCategory && (
          <div className="alert alert-danger mt-5" role="alert">
            {'没有选择category'}
          </div>
        )}
      </div>
    )
  }
}
export default withRouter(withContext(Create))
