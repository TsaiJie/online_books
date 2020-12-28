import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import PriceList from './components/PriceList'
import ViewTab from './components/ViewTab'
import { LIST_VIEW, CHART_VIEW } from './utility'
import TotalPrice from './components/TotalPrice'
import MonthPicker from './components/MonthPicker'
const items = [
  {
    id: 1,
    title: '去云南旅游',
    date: '2018-09-10',
    price: 200,
    category: {
      id: '1',
      name: '旅行',
      type: 'outcome',
      iconName: 'ios-plane',
    },
  },
  {
    id: 2,
    title: '去云南旅游',
    date: '2018-09-10',
    price: 400,
    category: {
      id: '1',
      name: '旅行',
      type: 'outcome',
      iconName: 'ios-plane',
    },
  },
]
function App() {
  return (
    <div className="App">
      <header>
        <TotalPrice />
      </header>
      <ViewTab
        activeTab={LIST_VIEW}
        onTabChange={(view) => {
          console.log(view)
        }}
      />
      <PriceList
        items={items}
        onModifyItem={(item) => {
          console.log(item)
        }}
        onDeleteItem={(item) => {
          console.log(item)
        }}
      />
      <MonthPicker year={2015} month={2} />
    </div>
  )
}

export default App
