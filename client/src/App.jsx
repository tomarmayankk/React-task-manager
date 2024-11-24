import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import AddEditNotes from './Components/AddEditNotes';
import Main from './Pages/Home/Main';

function App() {
  return (
    <>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route exact path='/' element = {<Main/>} />
        <Route exact path='/Home' element = {<Home/>} />
        <Route exact path='/Login' element = {<Login/>} />
        <Route exact path='/Register' element = {<Register/>} />
        <Route exact path='/add' element = {<AddEditNotes/>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
