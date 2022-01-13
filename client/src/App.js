import './App.css';  
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Detail from './components/Detail';
import Create from './components/Create';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <h1>POKEMON</h1> */}
        <img src='https://i.pinimg.com/originals/24/e2/22/24e22210f9d1d758a67c5badbac72077.jpg'height='50px' width='100px' />
        <img src='https://th.bing.com/th/id/OIP.Vw_KuEL919GZpSbyoeXw9gHaEK?w=314&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7' height='70px' width='200px' />
        <img src='https://i.pinimg.com/originals/24/e2/22/24e22210f9d1d758a67c5badbac72077.jpg'height='50px' width='100px' />
        <Routes>
          <Route exact path = '/' element={<LandingPage />} />
          <Route path = '/home' element={<Home />} />
          <Route path = '/pokemon' element={<Create />} /> 
          <Route path = '/detail/:id' element={<Detail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
