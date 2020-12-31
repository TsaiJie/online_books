/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
export class Tabs extends PureComponent {
  static propTypes = {
    activeIndex: PropTypes.number.isRequired,
    onTabChange: PropTypes.func.isRequired,
  }
  state = {
    activeIndex: this.props.activeIndex,
  }
  tabChange = (event, index) => {
    event.preventDefault()
    this.setState({
      activeIndex: index
    })
    this.props.onTabChange(index)
  }
  render() {
    const { children } = this.props
    const { activeIndex } = this.state
    return (
      <div>
        <ul className="nav nav-tabs nav-fill my-4">
          {React.Children.map(children, (child, index) => {
            const activeClassName =
              activeIndex === index ? 'nav-link active' : 'nav-link'
            return (
              <li className="nav-item">
                <a
                  href="#"
                  className={activeClassName}
                  onClick={(event) => this.tabChange(event, index)}
                >
                  {child}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export const Tab = ({ children }) => <React.Fragment>{children}</React.Fragment>
