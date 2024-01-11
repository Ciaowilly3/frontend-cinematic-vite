import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <div className="App bg-my-secondary">
      <Header />
      <div className="container">
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default App;
