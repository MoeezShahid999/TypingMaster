import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import TypingArea from "./components/TypingArea";

function App() {
  return (
    <div className="App">
      <Header />
      <TypingArea/>
    </div>
  );
}

export default App;
