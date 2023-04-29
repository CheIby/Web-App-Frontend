import './App.css';
import { BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Order from './pages/Order';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ScoreBoard from './pages/ScoreBoard';
import { getCookie } from 'cookies-next';

function App() {
  const token = getCookie('accessToken')
  return (
   <BrowserRouter>
   {token?
   <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/scoreboard' element={<ScoreBoard/>}/>
      <Route path='/order' element={<Order/>}/>
      <Route path='/profile' element={<Profile/>}/>
   </Routes>:
   <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/scoreboard' element={<ScoreBoard/>}/>
    </Routes>}    
   </BrowserRouter>
  )
}

export default App;
