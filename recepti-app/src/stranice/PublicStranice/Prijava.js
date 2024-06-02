
import SignUpForm from '../../components/SignUpForm';
import Navbar from '../../components/Navbar';
import { Routes, Route } from 'react-router-dom';

export default function Prijava(){
    
    return(
        <>
        <div><Navbar/></div>
            <Routes>
                
                <Route path='/' element={<SignUpForm/>}/>

            </Routes>
        </>
      
    );
}


