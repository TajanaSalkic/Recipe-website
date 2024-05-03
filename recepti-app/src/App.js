import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Navbar from "./components/Navbar"
import Pocetna from './stranice/Pocetna';
import Onama from './stranice/Onama';
import Recepti from './stranice/Recepti';

function App() {
  return (
    <Router>
        <Navbar/>
      <div className="container main">
        <Routes>
          <Route path="/" element={<Pocetna />}/>
          <Route path="/recepti" element={<Recepti />}/>
          <Route path="/about" element={<Onama />}/>
        </Routes>
      </div>
      {/*<Footer/> */}
    </Router>
  );
}

export default App;
