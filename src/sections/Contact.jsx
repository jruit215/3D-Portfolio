import React, { useState, useRef } from "react";
import TitleHeader from "../components/TitleHeader.jsx";
import ContactExperience from "../components/ContactExperience.jsx";
import emailjs from '@emailjs/browser'

const Contact = () => {
    const formRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // HANDLE FORM SUBMISSION LOGIC HERE  
        
        setLoading(true);

        try {
            await emailjs.sendForm(
                import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
                formRef.current,
                import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
            );

            // RESET FORM AFTER SUBMISSION
            setFormData({ name: '', email: '', message: '' });

        } catch (error) {
            console.log('EMAILJS ERROR,', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="flex-center section-padding">
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader
                    title="Get In Touch - Let's Connect"
                    sub="💬 Have questions or ideas? Let's talk! 🚀"
                />

                <div className="mt-16 grid-12-cols">
                    {/* CONTACT FORM - LEFT SIDE */}
                    <div className="xl:col-span-5">
                        <div className="flex-center card-border rounded-xl p-10">
                            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-7" ref={formRef}>
                                <div className="mb-6">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Your name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Your email address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="5"
                                        placeholder="Your message here"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                <button type="submit" disabled={loading}>
                                    <div className="cta-button group">
                                        <div className="bg-circle" />
                                        <p className="text">{loading ? 'Sending...' : 'Send Message'}</p>
                                        <div className="arrow-wrapper">
                                            <img src="/images/arrow-down.svg" alt="arrow"/>
                                        </div>
                                    </div>
                                </button>


                            </form>
                        </div>
                    </div>

                    {/* CONTACT FORM - RIGHT SIDE */}
                    <div className="xl:col-span-7 min-h-96">
                        <div className="w-full h-full bg-[#cd7c2e] hover:cursor-grab rounded-3xl overflow-hidden">
                            <ContactExperience />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact