import './App.css';
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route path="products/:name" component={ProductsByName} />
    </div>
  );
}

export default App;
