import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './Home';
import District from './Components/District';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element ={<Home/>}/>
        <Route path='/district=:district' element={<District/>}/>
      </Routes>
    </div>
  );
}

export default App;
