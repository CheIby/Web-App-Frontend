import './App.css';
import { BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './pages/Home';
// import { Navbar } from './components/Navbar';
import Login from './pages/Login';
import Order from './pages/Order';
import Register from './pages/Register';
import Profile from './pages/Profile';
// import UserInfo from './pages/UserInfo';

function App() {
  return (
   <BrowserRouter>    
   <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/order' element={<Order/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/profile' element={<Profile/>}/>
      {/* <Route path='/test' element={<UserInfo/>}/> */}
    </Routes>
   </BrowserRouter>
  )
}

export default App;
