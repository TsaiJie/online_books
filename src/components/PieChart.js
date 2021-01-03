import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import * as Echarts from 'echarts'

export default class CustomPieChart extends PureComponent {
  render() {
    const { title, categoryData, width, height } = this.props

    if (categoryData.length === 0) {
      return <h3 className="text-center mx-3"> {title} 还没有任何数据</h3>
    }
    return (
      <div className="pie-chart-component">
        <h3 className="text-center mt-3">{title}</h3>
        <div className="pie-chart" style={{ width, height,marginLeft: 'auto', marginRight:'auto'}} ref={(ref) => this.PieChartRef = ref}></div>
      </div>
    )
  }
  static propTypes = {
    title: PropTypes.string,
    categoryData: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number
  }
  static defaultProps = {
    title: '',
    categoryData: [],
    width: 400,
    height: 400
  }
  componentDidMount() {
    const { categoryData } = this.props
    if (categoryData.length !== 0) {
      this.drawPieChart()
    }
  }
  drawPieChart = () => {
    const { categoryData } = this.props
    console.log(categoryData);
    // 基于准备好的dom，初始化echarts实例
    const myChart = Echarts.init(this.PieChartRef)
    // 指定图表的配置项和数据
    const option = {
      tooltip: {},
      legend: {},
      series: [
        {
          name: '面积模式',
          type: 'pie',
          radius: [30, 110],
          center: ['55%', '50%'],
          // roseType: 'area',
          data: categoryData
        },
      ],
    }

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
  }
}
