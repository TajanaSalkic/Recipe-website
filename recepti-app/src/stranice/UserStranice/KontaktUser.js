
import '../../stilovi/contact.css';
import Navbar from '../../components/Navbar';
import { useState} from "react";
import { useForm } from "react-hook-form";
import useWeb3Forms from "@web3forms/react";

export default function ContactUs() {
  const {
    register,
    handleSubmit,
    reset,
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
      from_name: "Recipe App Contact Form",
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
      <><Navbar/>
        <div className="contact-us-wrapper">
            <div className="contact-us-container">
                <h1>Kontakt</h1>
                <p>Vaše mišljenje je važno za nas, stoga ne ustručavajte se kontaktirati nas radi bilo kakvih pitanja ili povratnih informacija.</p>
                <div className="contact-form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="UnosArea">
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
  
                        <div className="UnosAreaE">
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
  
                        <div className="UnosArea">
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
                <div className="google-maps-container">
                        <iframe
                            className="google-maps-iframe"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2860.402780810643!2d17.9010335760328!3d44.19877017108148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475ee2423f1ab2d3%3A0x6740c6af1734d8b0!2sMa%C5%A1inski%20fakultet%20u%20Zenici!5e0!3m2!1sen!2sba!4v1715886119146!5m2!1sen!2sba"
                            width="500"
                            height="250"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
</div>
                </div>
            </div>
        </div>
        </>
    
);
}