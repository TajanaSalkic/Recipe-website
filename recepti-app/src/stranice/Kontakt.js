/*import React, { useState } from 'react';*/
import '../stilovi/contact.css';
/*import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';*/


/*
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
                <a href="tel:+123456789">{/*<FaPhone />}</a>
                <div>
                <p>032-514-367</p>
                <p>033-875-222</p>
                <p>032-414-363</p>
                </div>
                <a href="mailto:info@example.com">{/*<FaEnvelope />}</a>
                <div>
                <p>info@example.com</p>
                <p>info@example.com</p>
                <p>info@example.com</p> 
                </div>
                <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">{/*<FaMapMarkerAlt />}</a>
                    <div> {/* Dodajemo div za pravilno poravnanje }
                         <p>Fakultetska 1</p> {/* Prva adresa }
                         <p>Aska Borića bb</p> {/* Druga adresa }
                    </div>
                </div>

            </div>

            
        </div>
    );
}

export default ContactUs;
*/

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useWeb3Forms from "@web3forms/react";

export default function ContactUs() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState(false);

  // Please update the Access Key in the .env
  const apiKey = process.env.PUBLIC_ACCESS_KEY || "0e001284-b4e1-4ffa-9db4-424d2815e3ce";

  const { submit: onSubmit } = useWeb3Forms({
    access_key: apiKey,
    settings: {
      from_name: "Acme Inc",
      subject: "New Contact Message from your Website",
    },
    onSuccess: (msg, data) => {
      setIsSuccess(true);
      setMessage(msg);
      reset();
    },
    onError: (msg, data) => {
      setIsSuccess(false);
      setMessage(msg);
    },
  });

  return (
      
        <div className="contact-us-wrapper">
            <div className="contact-us-container">
                <h1>Kontakt</h1>
                <p>Vaše mišljenje je važno za nas, stoga ne ustručavajte se kontaktirati nas radi bilo kakvih pitanja ili povratnih informacija.</p>
                <div className="contact-form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <input type="text" placeholder="Full Name"
                            autoComplete="false"
                            {...register("name", {
                                required: "Full name is required",
                                maxLength: 80,
                                    }
                                )
                            }/>
                            {errors.name && (
                            <div>
                                <small>{errors.name.message}</small>
                            </div>
                            )}
                        </div>
  
                        <div>
                            <label htmlFor="email_address">
                            
                                <input id="email_address" type="email"
                                    placeholder="Email Address"
                                    name="email"
                                    autoComplete="false"
                                    {...register("email", {
                                    required: "Enter your email",
                                    pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Please enter a valid email",
                                    },
                                            }
                                        )
                                    }/>
                            </label>
                                    {errors.email && (
                                    <div>
                                        <small>{errors.email.message}</small>
                                    </div>
                                        )
                                    }
                        </div>
  
                        <div>
                            <textarea name="message" placeholder="Your Message"
                            {...register("message", {
                            required: "Please enter a message",
                                    }
                                )
                            }/>
                            {errors.message && (
                            <div>
                                <small>{errors.message.message}</small>
                            </div>
                                )
                            }
                        </div>
  
                        <button type="submit">
                            {isSubmitting ? (
                            <svg xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24">
                                <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4">
                                </circle>
                                    <path fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                   </path>
                            </svg>
                                ) : (
                                    "Send Message"
                                    )
                            }
                        </button>
                    </form>
                </div>

                    {isSubmitSuccessful && isSuccess && (
                        <div>
                            {message || "Success. Message sent successfully"}
                        </div>
                        )
                    }
                    {isSubmitSuccessful && !isSuccess && (
                        <div>
                            {message || "Something went wrong. Please try later."}
                        </div>
                        )   
                    }
                <div className="contact-icons">
                <a href="tel:+123456789">{/*<FaPhone />*/}</a>
                <div>
                <p>032-514-367</p>
                <p>033-875-222</p>
                <p>032-414-363</p>
                </div>
                <a href="mailto:info@example.com">{/*<FaEnvelope />*/}</a>
                <div>
                <p>info@example.com</p>
                <p>info@example.com</p>
                <p>info@example.com</p> 
                </div>
                <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">{/*<FaMapMarkerAlt />*/}</a>
                    <div> {/* Dodajemo div za pravilno poravnanje */}
                         <p>Fakultetska 1</p> {/* Prva adresa */}
                         <p>Aska Borića bb</p> {/* Druga adresa */}
                    </div>
                </div>
            </div>
        </div>
    
);
}