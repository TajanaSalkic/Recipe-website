/*stranoica na kojoj ce admin dobiti sve korisnike i gdje ce moci da ih izbrise
import { useState , useEffect} from "react"
import {db} from './firebase-config';
import {collection, getDocs, addDoc,deleteDoc,doc} from 'firebase/firestore';

export default function Admin(){

    const [newusername, setNewUsername] = useState("")
    const [newemail, setNewEmail] = useState("")
    const [newpassword, setNewPassword] = useState("")

    const [korisnici, setKorisnici]= useState([]);
    const korisniciCollectionRef = collection(db,"Korisnici");
    
    const createKorisnik = async() => {
        await addDoc(korisniciCollectionRef, {
            username: newusername,
            email: newemail,
            password: newpassword
        });
    }

    const deleteKorisnik = async(id) => {
        await deleteDoc(doc(db, "Korisnici", id));
    }
    
    useEffect(()=>{
         const getKorisnici = async () =>{
                  const data = await getDocs(korisniciCollectionRef);
                  setKorisnici(data.docs.map((doc) => ({ ...doc.data(), id:doc.id})));
         }; 
         getKorisnici();
     }, []);

    return(
        <div className="Prijava">
            <input placeholder="Username..." 
            onChange={(event)=>{
                setNewUsername(event.target.value);
                }}
            />
            <input placeholder="Email..."
                onChange={(event)=>{
                    setNewEmail(event.target.value);
                    }}
            />
            <input placeholder="Password..."
                onChange={(event)=>{
                    setNewPassword(event.target.value);
                    }}
            />

            <button onClick={createKorisnik}>Create</button>{
             korisnici.map((korisnik) => {
             return <div> 
                {" "}
                <h1>Username: {korisnik.username}</h1>
                <h1>Email: {korisnik.email}</h1>
                <h1>Password: {korisnik.password}</h1>
                <button onClick={()=> {deleteKorisnik(korisnik.id)}}>Delete</button>
                </div>
        })}
            
        </div>
    )
}*/


import NavbarAdmin from "../components/NavbarAdmin"
export default function Admin(){
    //chatgpt admin
/*
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const getAuth = admin.auth;

const uid = 'oXkB3GQYLcfxktEpsuPsMzpdqzr2'; // Replace with the UID of the user you want to fetch

getAuth().getUser(uid)
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log(`Successfully fetched user data: ${JSON.stringify(userRecord.toJSON(), null, 2)}`);
  })
  .catch((error) => {
    console.error('Error fetching user data:', error);
  });*/
    return(
        
       <> <NavbarAdmin/>
        <div> Hi</div>
        </>
    )
}


