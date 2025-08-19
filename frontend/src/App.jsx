
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/login'
import Signup from './pages/signup'
import Dashboard from './pages/dashboard'


function App() {
  return(
    <>
    <Router>
       <h1>Abdul Hamid World!</h1>
      <Routes>
        <Route path='/' element={<Login/>}/>
         <Route path='/signup' element={<Signup/>}/>
         <Route path='/home' element={<Dashboard/>}/>
        
      </Routes>
    </Router>
     
    </>
  );
}

export default App
