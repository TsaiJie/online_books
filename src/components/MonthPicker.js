/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { getState, padLeft, range } from '../utility'
class MonthPicker extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      selectedYear: props.year
    }
    this.monthPickerRef = React.createRef()
  }
  documentClickHandler = (e) => {
    // 判断当前点击的元素中是否包含 MonthPicker
    const currentClick = e.target
    const monthPicker = this.monthPickerRef.current
    const flag = monthPicker.contains(currentClick)
    //如果包含则进行关闭
    !flag && this.setState({ isOpen: false })
  }
  componentDidMount() {
    // false =》 冒泡
    // true =》 捕获
    document.addEventListener('click', this.documentClickHandler, false)
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.documentClickHandler, false)
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
        <span style={{fontSize:'18px', fontWeight: 700, marginRight: '20px'}}>选择月份 :</span> 
        <button
          className="btn  btn-secondary dropdown-toggle"
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
              <div className="col border-right years-range">
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
              <div className="col months-range">
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
