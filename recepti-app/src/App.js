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
import ReceptiUser from './stranice/ReceptiUser';
import Recept from './stranice/Recept';
import ContactUs from './stranice/Kontakt';
import Footer from './components/Footer';
import Prijava from './stranice/Prijava';
import Login from './components/Login';
import AdminPage from './stranice/AdminPage'
import UserPage from './stranice/UserPage'
import PocetnaAdmin from './stranice/PocetnaAdmin'
import PocetnaUser from './stranice/PocetnaUser'
import Admin from './stranice/Admin'
import OnamaUser from './stranice/OnamaUser'
import ContactUsUser from './stranice/KontaktUser';
import ReceptUser from './stranice/ReceptUser';
import Omiljeni from './stranice/Omiljeni';


function App() {
  return (
    <Router>
        
      <div className="containers main">
        <Routes>
          <Route path="/" element={<Pocetna />}/>
          <Route path="/admin/" element={<PocetnaAdmin />}/>
          <Route path="/:email/" element={<PocetnaUser />}/>
          <Route path="/admin/korisnici" element={<Admin />}/>
          <Route path="/recepti" element={<Recepti />}/>
          <Route path="/:email/recepti" element={<ReceptiUser />}/>
          <Route path="/prijava" element={<Prijava />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/about" element={<Onama />}/>
          <Route path="/:email/about" element={<OnamaUser />}/>
          <Route exact path="/undefined/recipe/:id" element={<Recept/>}/>
          <Route exact path="/:email/recipe/:id" element={<ReceptUser/>}/>
          <Route path="/kontakt" element = {<ContactUs/>}/>
          <Route path="/:email/kontakt" element = {<ContactUsUser/>}/>
          <Route path="/admin" element={<AdminPage />} />  
          <Route path="/:email" element={<UserPage />} /> 
          <Route path="/:email/omiljeno" element={<Omiljeni />}/>
          
        </Routes>
      </div>
      <Footer/> 
    </Router>
  );
}

export default App;

