import React from "react";
import "./App.css";
import SearchBar from "./Components/SearchBar";

function App() {
  const data = [
    { name: "Daniel", age: 25 },
    { name: "John", age: 24 },
    { name: "Jen", age: 31 },
  ];
  return (
    <div className="App">
      <SearchBar placeholder="Find yout furniture..." />
      <DataList data={data} />
    </div>
  );
}

export default App;
