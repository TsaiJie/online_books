/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import Ionicon from 'react-ionicons'
import { LIST_VIEW, CHART_VIEW } from '../utility'

const generateLinkClass = (current, view) => {
  return [current === view ? 'nav-link active' : 'nav-link', current === view ? '#007bff' : 'black']
}

const ViewTab = ({ activeTab, onTabChange }) => (
  <ul className="nav nav-tabs nav-fill my-4">
    <li className="nav-item">
      <a
        className={generateLinkClass(activeTab, LIST_VIEW)[0]}
        href="#"
        onClick={(event) => {
          event.preventDefault()
          onTabChange(LIST_VIEW)
        }}
      >
        <Ionicon
          className="rounded-circle mr-2"
          fontSize="25px"
          color={generateLinkClass(activeTab, LIST_VIEW)[1]}
          icon={'ios-paper'}
        />
        <span style={{color: generateLinkClass(activeTab, LIST_VIEW)[1]}}>列表模式</span>  
      </a>
    </li>
    <li className="nav-item">
      <a
        className={generateLinkClass(activeTab, CHART_VIEW)[0]}
        href="#"
        onClick={(event) => {
          event.preventDefault()
          onTabChange(CHART_VIEW)
        }}
      >
        <Ionicon
          className="rounded-circle mr-2"
          fontSize="25px"
          color={generateLinkClass(activeTab, CHART_VIEW)[1]}
          icon={'ios-pie'}
        />
        <span style={{color: generateLinkClass(activeTab, CHART_VIEW)[1]}}>图表模式</span>  
      </a>
    </li>
  </ul>
)
ViewTab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
}
export default ViewTab
