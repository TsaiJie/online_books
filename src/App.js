import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PriceList from './components/PriceList';
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
    },
  },
  
];
function App() {
  return (
    <div className="App">
      <header>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <PriceList 
        items={items}
        onModifyItem={(item) => {console.log(item)}}
        onDeleteItem={(item) => {console.log(item)}}
      />
    </div>
  )
}

export default App
