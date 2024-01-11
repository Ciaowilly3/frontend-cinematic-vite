import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App bg-my-secondary">
      <Header />
      <div className="container">
        <Home />
      </div>
    </div>
  );
}

export default App;
