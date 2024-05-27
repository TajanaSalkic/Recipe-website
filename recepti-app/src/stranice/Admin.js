//stranoica na kojoj ce admin dobiti sve korisnike i gdje ce moci da ih izbrise
/*import { useState , useEffect} from "react"
import {db} from './firebase-config';
import {collection, getDocs, addDoc,deleteDoc,doc} from 'firebase/firestore';
import NavbarAdmin from "../components/NavbarAdmin"

import { getAuth, deleteUser } from "firebase/auth";
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const AdminPage = () => {
 const [users, setUsers] = useState([]);
  const functions = getFunctions();

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      // Call a cloud function to delete the user from Firebase Auth
      const deleteUserFunction = httpsCallable(functions, 'deleteUser');
      await deleteUserFunction({ uid: userId });
      
      // Delete the user document from Firestore
      await deleteDoc(doc(db, "users", userId));
      
      // Update the local state
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  return (
    <div>
      <h1>Admin Page - List of Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;*/
/*<ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>*/
/*chatgpt
      import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../stranice/firebase-config';
//import '../stilovi/korisnici.css';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const userCollection = collection(db, 'users');
      const userSnapshot = await getDocs(userCollection);
      const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(userList);
    };

    if (auth.currentUser?.email == 'admin@gmail.com') {
      fetchUsers();
    } else {
      fetchUsers();
    }
  }, [navigate]);

  return (
    
    <div className="korisnici">
      <h1>Users List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Other Info</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.otherInfo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
*/
//stranoica na kojoj ce admin dobiti sve korisnike i gdje ce moci da ih izbrise
/*
import { useState , useEffect} from "react"
import {auth, db} from './firebase-config';
import {collection, getDocs, addDoc,deleteDoc,doc} from 'firebase/firestore';
import {app} from './firebase-config';

export default function Admin(){
/*  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // User is signed in.
      // Perform the Firebase operation here.
    } else {
      // No user is signed in.
      console.error('User is not authenticated');
    }
  });*/import React, { useEffect, useState } from 'react';
  import { collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore';
  import { db } from '../stranice/firebase-config';
  
  const Admin = () => {
      const [users, setUsers] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
  
      useEffect(() => {
          const fetchUsers = async () => {
              try {
                  const userCollection = collection(db, "users");
                  const userSnapshot = await getDocs(userCollection);
                  const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
          <div className="user-list">
              <h1>User List</h1>
              <ul>
                  {users.length > 0 ? (
                      users.map(user => (
                          <li key={user.id}>
                              {user.email}
                              <button onClick={() => handleDelete(user.id, user.email)}>Delete</button>
                          </li>
                      ))
                  ) : (
                      <li>No users found</li>
                  )}
              </ul>
          </div>
      );
  };
  
  export default Admin;