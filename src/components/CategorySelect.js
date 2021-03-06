import React, { PureComponent } from 'react'
import Ionicon from 'react-ionicons'
import {Colors} from '../utility'
export default class CategorySelect extends PureComponent {
  selectCategory = (event, category) => {
    this.props.onSelectCategory(category)
    event.preventDefault()
  }
  
  render() {
    const { categories, selectedCategory } = this.props
    const selectedCategoryId = selectedCategory && selectedCategory.id
    return (
      <div className="category-select-component ">
        <div className="row">
          {categories.map((category, index) => {
            const iconColor = (category.id === selectedCategoryId) ? Colors.white : Colors.gray
            const backColor = (category.id === selectedCategoryId) ? Colors.blue : Colors.lightGray
            const activeClassName =
            selectedCategoryId && selectedCategoryId === category.id
                ? 'category-item col-3 active'
                : 'category-item col-3'
            return (
              <div 
                className={activeClassName} 
                key={index}
                onClick={event => {this.selectCategory(event, category)}}
              >
                <Ionicon
                  className="rounded-circle"
                  fontSize="50px"
                  style={{ backgroundColor: backColor, padding: '5px' }} 
                  color={iconColor}
                  icon={category.iconName}
                />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
