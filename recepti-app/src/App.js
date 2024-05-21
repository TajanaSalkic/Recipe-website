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
import Recept from './stranice/Recept';
import ContactUs from './stranice/Kontakt';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
        <Navbar/>
      <div className="container main">
        <Routes>
          <Route path="/" element={<Pocetna />}/>
          <Route path="/recepti" element={<Recepti />}/>
          <Route path="/about" element={<Onama />}/>
          <Route exact path="/recipe/:id" element={<Recept/>}/>
          <Route path="/kontakt" element = {<ContactUs/>}/>

        </Routes>
      </div>
      <Footer/> 
    </Router>
  );
}

export default App;

