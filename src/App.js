import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./components/Index";
import { Home } from "./pages/Home";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="cadastrar-aluno" element={<Index />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
export default App;
