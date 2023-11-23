
import './App.css';
import RangeSlider from './components/RangeSlider'

function App() {
  return (
    <div className="App">
      <RangeSlider 
        min={0}
        max={1000}
        priceGap={70}
      />
    </div>
  );
}

export default App;
