/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { getState, padLeft, range } from '../utility'
class MonthPicker extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
    }
    this.monthPickerRef = React.createRef()
    // 绑定的函数要唯一 方便取消监听
    this.documentClickHandler = this.documentClickHandler.bind(this)
  }
  documentClickHandler(e) {
    // 判断当前点击的元素中是否包含 MonthPicker
    const currentClick = e.target
    const flag = currentClick.contains(this.monthPickerRef.current)
    //如果包含则进行关闭
    flag && this.setState({ isOpen: false })
  }
  componentDidMount() {
    document.addEventListener('click', this.documentClickHandler)
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.documentClickHandler)
  }
  toggleDropdown(event) {
    event.preventDefault()
    this.setState({
      isOpen: !this.state.isOpen,
      selectedYear: this.props.year,
    })
  }
  selectYear(event, yearNumber) {
    event.preventDefault()
    this.setState({
      selectedYear: yearNumber,
    })
  }
  selectMonth(event, monthNumber) {
    event.preventDefault()
    this.setState({
      isOpen: false,
    })
    this.props.onChange(this.state.selectedYear, monthNumber)
  }
  render() {
    const { year, month } = this.props
    const { isOpen, selectedYear } = this.state
    const monthRange = range(12, 1)
    const yearRange = range(9, -4).map((number) => number + year)
    return (
      <div
        className="dropdown month-picker-component"
        ref={this.monthPickerRef}
      >
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
                  <a
                    key={index}
                    href="#"
                    className={getState(yearNumber, selectedYear)}
                    onClick={(event) => this.selectYear(event, yearNumber)}
                  >
                    {yearNumber} 年
                  </a>
                ))}
              </div>
              <div className="col">
                {monthRange.map((monthNumber, index) => (
                  <a
                    onClick={(event) => this.selectMonth(event, monthNumber)}
                    key={index}
                    href="#"
                    className={getState(monthNumber, month)}
                  >
                    {padLeft(monthNumber)} 月
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
MonthPicker.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}
export default MonthPicker
