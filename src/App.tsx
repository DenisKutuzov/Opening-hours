import './App.css'
import Hours from './components/Hours/Hours'
import data from '../src/data/hours.json';


function App() {
  return (
    <div className="App">
      <Hours data={data}/>
    </div>
  )
}

export default App
