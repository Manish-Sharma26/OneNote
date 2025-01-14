import './App.css';
import {
  BrowserRouter ,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState'
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
 
  return (
    <>
      <NoteState>
      <BrowserRouter>
      <Navbar/>
      <div className="">
      <Routes>
      <Route  path="/"  element={<Home/>} />
      <Route  path="/about"  element={<About/>} />
      <Route  path="/login"  element={<Login/>} />
      <Route  path="/signup"  element={<SignUp/>} />
      </Routes>
      </div>
      </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
