import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App bg-my-secondary">
      <Outlet></Outlet>
    </div>
  );
}

export default App;
