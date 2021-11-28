import './app.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Home from './Home';
import Create from './Create';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pet/save" element={<Create />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
