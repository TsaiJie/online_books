import React from 'react'
import CategorySelect from '../components/CategorySelect'
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
let propsWithCategory = {
  categories,
  onSelectCategory: (categroy)=>{console.log(categroy)},
  selectedCategory: categories[0]
}
const Create = ({match }) => {
  console.log(match)
  return <CategorySelect {...propsWithCategory}/>
}
export default Create