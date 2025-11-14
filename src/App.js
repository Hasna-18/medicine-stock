import React from "react";
import Navbar from "./Navbar";
import AppRouter from "./Router";
import "./App.css";

function App() {
  return (
      <div className="App">
        <Navbar />
        <div className="container">
          <AppRouter />
        </div>
      </div>
  );
}

export default App;