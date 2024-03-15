import React from "react";
import "./App.css";
import TableBilliard from "./components/TableBilliard";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="container">
        <TableBilliard />
      </div>
    </div>
  );
};

export default App;
