
import './App.css';
import {  Routes, Route  } from "react-router-dom";

import Navigation from './components/Navigation'
import CreateUser from './components/CreateUser'
import CreateNote from './components/CreateNote'
import NoteList from './components/NoteList'

function App() {
  return (
    <div>
      <Navigation/>
      <div className="container p-4"> 
        <Routes>
          <Route path="/" exact element={<NoteList/>} />
          <Route path="/CreateUser" element={<CreateUser/>} />
          <Route path="/CreateNote" element={<CreateNote/>} />
          <Route path="/edit/:id" element={<CreateNote/>} />
        </Routes>
      </div>
    </div>
    
  

    
  );
}

export default App;
