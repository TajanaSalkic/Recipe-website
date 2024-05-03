import logo from './logo.svg';


import Navbar from "./components/Navbar"
import Uvod from "./components/Uvod.js"
import ReceptiNeki from './components/ReceptiNeki.js';
function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className="container main">
        <Uvod/>
        <ReceptiNeki/>
      </div>
    </div>
  );
}

export default App;
