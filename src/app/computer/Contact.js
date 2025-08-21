import { useRef, useState, useContext } from "react";
import emailjs from '@emailjs/browser';

import { SoundContext } from "stores/SoundContext";
import { useAudio } from 'hooks/useAudio';

import Window from "components/computer/Window";

import clickSfx from 'assets/sfx/click.mp3';
import sendSfx from 'assets/sfx/send.mp3';


const Contact = () => {

    const form = useRef();
    const [error, setError] = useState(null);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);

    const soundOn = useContext(SoundContext);
    const playClickSfx = useAudio(clickSfx);
    const playSendSfx = useAudio(sendSfx);

    const closePopup = () => {
        setShowErrorPopup(false);
        setShowSuccessPopup(false);
        
        if(soundOn) {
            playClickSfx();
        }
    }

    const handleFormSubmit = (formData) => {
        
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        if(!name || !email || !message) {
            setError('Please fill all fields');
        } else {
            const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
            const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
            const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

            if(soundOn) {
                playSendSfx();
            }

            emailjs.send(SERVICE_ID, TEMPLATE_ID, {
                from_name: name,
                reply_to: email,
                message: message
            }, {
                publicKey: PUBLIC_KEY
            }).then(() => { 
                setShowSuccessPopup(true);
            }, (err) => { 
                setShowErrorPopup(true);
            });
        }
    }

    return (
        <>
            <form action={handleFormSubmit} ref={form}>
                <div className="booking-message">
                    <p>Booking inquiries: <strong className="booking-email">booking@fruitfly.band</strong></p>
                    <p className="booking-subtitle">For other inquiries, use the form below</p>
                </div>
                <div className="form-header">
                    <div className="form-input">
                        <label>Name</label>
                        <input type="text" name="name"/>
                    </div>
                    <div className="form-input">
                        <label>Email</label>
                        <input type="email" name="email"/>
                    </div>
                </div>
                <div className="textarea-container">
                    <label>Message</label>
                    <textarea name="message" />
                </div>
                <div className="submit-row">
                    <input type="submit" value="Send" className="submit-btn" />
                    {error && <p className="error-msg">{error}</p>}
                </div>
            </form>
            {showSuccessPopup &&
                <Window open={true} popup={true} caption="Message Sent">
                    <p className="popup-text">Thanks for reaching out! <br/> We'll be in touch soon!</p>
                    <button className="submit-btn" onClick={closePopup}>OK</button>
                </Window>
            }
            {showErrorPopup &&
                <Window open={true} popup={true} caption="ERROR">
                    <p className="popup-text">Unable to send message. <br/> Please try again later.</p>
                    <button className="submit-btn" onClick={closePopup}>OK</button>
                </Window>
            }
        </>
    );
};

export default Contact;