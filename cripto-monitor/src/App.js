import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./paginas/Home/Home";
import { Consulta } from "./paginas/Consulta/Consulta";
import { Listagem } from "./paginas/Listagem/Listagem";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />        
          <Route path='/consulta' element={<Consulta />} />        
          <Route path='/listagem' element={<Listagem />} />        
        </Routes>
    </BrowserRouter>     
    </div>
  );
}

export default App;
