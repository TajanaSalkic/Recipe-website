import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import NavbarAdmin from '../../components/AdminComponents/NavbarAdmin';
import '../../stilovi/korisnici.css';

const Korisnici = () => {
    const [users, setUsers] = useState([]); // State za korisnike
    const [loading, setLoading] = useState(true); // State za indikator učitavanja
    const [error, setError] = useState(null); // State za greške

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userCollection = collection(db, "users"); // Referenca na kolekciju "users"
                const userSnapshot = await getDocs(userCollection); // Dobijanje svih dokumenata iz kolekcije
                const userList = userSnapshot.docs.map((doc, index) => ({ id: doc.id, ...doc.data(), index })); // Mapiranje dokumenata u listu korisnika
                setUsers(userList); // Postavljanje liste korisnika u state
            } catch (err) {
                setError(err.message); // Postavljanje greške ako dođe do problema pri dohvatanju korisnika
            } finally {
                setLoading(false);
            }
        };

        fetchUsers(); // Poziv funkcije za dohvatanje korisnika
    }, []); // Prazan niz znači da će se useEffect izvršiti samo jednom, nakon prvog renderovanja komponente

    // Funkcija za brisanje korisnika
    const handleDelete = async (userId, email) => { 
        try {
            // Brisanje dokumenta korisnika
            await deleteDoc(doc(db, "users", userId));
            // Filtriranje korisnika i ažuriranje state-a
            setUsers(users.filter(user => user.id !== userId));

            // Dodavanje email-a u kolekciju blacklist
            await addDoc(collection(db, "blacklist"), { email });

        } catch (err) {
            console.error("Error deleting user:", err);
            setError(err.message);
        }
    };

    if (loading) { // Ako se učitavaju podaci
        return <div>Loading...</div>; 
    }

    if (error) { // Ako je došlo do greške
        return <div>Error: {error}</div>; // Prikazuje se greška
    }

    return ( // Vraća strukturu sa listom korisnika i opcijom brisanja
      <>
        <NavbarAdmin/>
        <div className="user-list">
            <h1>User List</h1>
            <ul>
                {users.length > 0 ? (
                    users.map(user => (
                        <li key={user.id} style={{ '--i': user.index }}>
                            {user.email}
                            <button onClick={() => handleDelete(user.id, user.email)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <li>Nema korisnika</li>
                )}
            </ul>
        </div>
      </>
    );
};

export default Korisnici;