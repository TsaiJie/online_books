/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { padLeft, range } from '../utility'
class MonthPicker extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }
  toggleDropdown(event) {
    event.preventDefault()
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }
  render() {
    const { year, month } = this.props
    const { isOpen } = this.state
    const monthRange = range(12, 1)
    const yearRange = range(9, -4).map((number) => number + year)
    return (
      <div className="dropdown month-picker-component">
        <h4>选择月份</h4>
        <button
          className="btn btn-lg btn-secondary dropdown-toggle"
          onClick={(e) => {
            this.toggleDropdown(e)
          }}
        >
          {`${year}年 ${padLeft(month)}月`}
        </button>
        {/* 下拉菜单 */}
        {isOpen && (
          <div className="dropdown-menu" style={{ display: 'block' }}>
            <div className="row">
              <div className="col border-right">
                {yearRange.map((yearNumber, index) => (
                  <a key={index} className="dropdown-item">
                    {yearNumber} 年
                  </a>
                ))}
              </div>
              <div className="col">
                {
                  monthRange.map((monthNumber, index) => (
                    <a key={index} className="dropdown-item">
                      {padLeft(monthNumber)} 月
                    </a>
                  ))
                }
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
export default MonthPicker
