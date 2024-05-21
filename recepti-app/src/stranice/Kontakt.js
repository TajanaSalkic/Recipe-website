import React, { useState } from 'react';
import '../stilovi/contact.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import '../stilovi/navbarDonji.css'
import NavbarDonji from '../components/NavbarDonji'

function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);

       //ovdje se pomocu POST, itd.. moze slati na server

        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    return (
        <div className="contact-us-wrapper">
            <div className="contact-us-container">
                <h1>Kontakt</h1>
                <p>Vaše mišljenje je važno za nas, stoga ne ustručavajte se kontaktirati nas radi bilo kakvih pitanja ili povratnih informacija.</p>
                <div className="contact-form">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Ime i prezime</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                        />

                        <label htmlFor="email">E-mail</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                        />

                        <label htmlFor="message">Komentar</label>
                        <textarea 
                            id="message" 
                            name="message" 
                            rows="4" 
                            value={formData.message} 
                            onChange={handleChange} 
                            required 
                        ></textarea>

                        <button type="submit">Potvrdi</button>
                    </form>
                </div>
                <div className="contact-icons">
                <a href="tel:+123456789"><FaPhone /></a>
                <div>
                <p>032-514-367</p>
                <p>033-875-222</p>
                <p>032-414-363</p>
                </div>
                <a href="mailto:info@example.com"><FaEnvelope /></a>
                <div>
                <p>info@example.com</p>
                <p>info@example.com</p>
                <p>info@example.com</p> 
                </div>
                <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer"><FaMapMarkerAlt /></a>
                    <div> {/* Dodajemo div za pravilno poravnanje */}
                         <p>Fakultetska 1</p> {/* Prva adresa */}
                         <p>Aska Borića bb</p> {/* Druga adresa */}
                    </div>
                </div>

            </div>

            <NavbarDonji/>
        </div>
    );
}

export default ContactUs;
