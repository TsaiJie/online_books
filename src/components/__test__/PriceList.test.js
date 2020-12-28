import React from 'react'
import { shallow } from 'enzyme'
import PriceList from '../PriceList'
import Ionicon from 'react-ionicons'
import { items, categories } from '../../containers/Home'
const itemsWithCategory = items.map((item) => {
  item.category = categories[item.cid]
  return item
})
const props = {
  items: itemsWithCategory,
  onModifyItem: jest.fn(),
  onDeleteItem: jest.fn(),
}
let wrapper
describe('test PriceList component', () => {
  beforeEach(() => {
    wrapper = shallow(<PriceList {...props} />)

  })
  it('should render the component to match snapshot', () => {
    // wrapper.getElement() 修复empty ShallowWrapper {}
    expect(wrapper.getElement()).toMatchSnapshot()
  })
  it('should render correct price items length', () => {
    expect(wrapper.find('.list-group-item').length).toEqual(itemsWithCategory.length)
  })
  it('should render correct icon and price for each item', () => {
    // first()取第一个元素 props() 属性
    const iconList = wrapper.find('.list-group-item').first().find(Ionicon)
    // console.log(iconList.debug())
    expect(iconList.length).toEqual(3)
    expect(iconList.first().props().icon).toEqual(itemsWithCategory[0].category.iconName)
    // console.log(iconList.first().props())
  })
  it('should trigger the correct function callbacks', ()=>{
    const firstItem = wrapper.find('.list-group-item').first()
    firstItem.find('a').first().simulate('click')
    expect(props.onModifyItem).toHaveBeenCalledWith(itemsWithCategory[0])
    firstItem.find('a').last().simulate('click')
    expect(props.onDeleteItem).toHaveBeenCalledWith(itemsWithCategory[0])
  })

  
})
