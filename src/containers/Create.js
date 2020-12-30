import React from 'react'
import CategorySelect from '../components/CategorySelect'
import PriceForm from '../components/PriceForm'
export const categories = [
  {
    id: '1',
    name: '旅行',
    type: 'outcome',
    iconName: 'ios-plane'
  },
  {
    id: '2',
    name: '理财',
    type: 'income',
    iconName: 'logo-yen'
  }, 
  {  
    id: '3',
    name: '理财',
    type: 'income',
    iconName: 'logo-yen'
  },
]
const testItem = [
  {
    "title": "这是我的工资",
    "price": 20000,
    "date": "2018-08-18",
    "monthCategory": "2018-8",
    "id": "_bd16bjeen",
    "cid": "2",
    "timestamp": 1534550400000
  },
  {
    "title": "buy stuff for kitten",
    "price": 100,
    "date": "2018-08-15",
    "monthCategory": "2018-8",
    "id": "_kly1klf4g",
    "cid": "1",
    "timestamp": 1534291200000
  }
]
let propsWithCategory = {
  categories,
  onSelectCategory: (categroy)=>{console.log(categroy)},
  selectedCategory: categories[0]
}
const Create = ({match }) => {
  console.log(match)
  return (
    <React.Fragment>
      <CategorySelect {...propsWithCategory}/>
      <PriceForm item={testItem[0]} onFormSubmit={(a,b)=>{console.log(a,b)}} onCancelSubmit={(e)=>{console.log(e)}}/>
    </React.Fragment>

  )
}
export default Create