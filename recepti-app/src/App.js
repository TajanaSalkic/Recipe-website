import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Pocetna from './stranice/PublicStranice/Pocetna';
import Onama from './stranice/PublicStranice/Onama';
import Recepti from './stranice/PublicStranice/Recepti';
import ReceptiUser from './stranice/UserStranice/ReceptiUser';
import Recept from './stranice/PublicStranice/Recept';
import ContactUs from './stranice/PublicStranice/Kontakt';
import Footer from './components/Footer';
import Prijava from './stranice/PublicStranice/Prijava';
import Login from './components/Login';
import AdminPage from './stranice/AdminStranice/AdminPage'
import UserPage from './stranice/UserStranice/UserPage'
import PocetnaAdmin from './stranice/AdminStranice/PocetnaAdmin'
import PocetnaUser from './stranice/UserStranice/PocetnaUser'
import Admin from './stranice/AdminStranice/Korisnici'
import OnamaUser from './stranice/UserStranice/OnamaUser'
import ContactUsUser from './stranice/UserStranice/KontaktUser';
import ReceptUser from './stranice/UserStranice/ReceptUser';
import Omiljeni from './stranice/UserStranice/Omiljeni';

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

