import React from 'react'
import { shallow } from 'enzyme'
import ViewTab from '../ViewTab'
import Ionicon from 'react-ionicons'
import { LIST_VIEW, CHART_VIEW } from '../../utility'

const props = {
  activeTab: LIST_VIEW,
  onTabChange: jest.fn()
}
let wrapper 
describe('test ViewTab component', () => {
  beforeEach(()=>{
    wrapper = shallow(<ViewTab {...props} />)
  })
  it('should render the component to match snapshot', () => {
    // wrapper.getElement() 修复empty ShallowWrapper {}
    expect(wrapper.getElement()).toMatchSnapshot()
  })
  it('should generate correct className with a', () => {
    const tabItem = wrapper.find('.nav-item').find('a')
    expect(tabItem.first().props().className).toBe('nav-link active')
    expect(tabItem.last().props().className).toBe('nav-link')
  })
  it('should trigger the correct function callbacks', ()=>{
    const lastTabItem = wrapper.find('.nav-item').find('a').last()
    // { preventDefault: () => {} } 默认事件
    lastTabItem.simulate('click', { preventDefault: () => {}})
    expect(props.onTabChange).toHaveBeenCalledWith(CHART_VIEW)
  })
})