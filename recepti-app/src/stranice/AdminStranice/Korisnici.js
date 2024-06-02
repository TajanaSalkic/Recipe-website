import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import NavbarAdmin from '../../components/AdminComponents/NavbarAdmin';
import '../../stilovi/korisnici.css';

const Korisnici = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userCollection = collection(db, "users");
                const userSnapshot = await getDocs(userCollection);
                const userList = userSnapshot.docs.map((doc, index) => ({ id: doc.id, ...doc.data(), index }));
                setUsers(userList);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId, email) => {
        try {
            // Delete the user document
            await deleteDoc(doc(db, "users", userId));
            setUsers(users.filter(user => user.id !== userId));

            // Add the email to the blacklist collection
            await addDoc(collection(db, "blacklist"), { email });

        } catch (err) {
            console.error("Error deleting user:", err);
            setError(err.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
      <><NavbarAdmin/>
        <div className="user-list">
            <h1 >User List</h1>
            <ul>
                {users.length > 0 ? (
                    users.map(user => (
                        <li key={user.id} style={{ '--i': user.index }}>
                            {user.email}
                            <button onClick={() => handleDelete(user.id, user.email)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <li>No users found</li>
                )}
            </ul>
        </div>
        </>
    );
};

export default Korisnici;