import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./Layouts/Header";

function App() {
  return (
    <div className="App bg-my-secondary">
      <div className="">
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default App;
