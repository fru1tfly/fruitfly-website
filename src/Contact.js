const Contact = () => {
    return (
            <form>
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
                        <input type="email"/>
                    </div>
                </div>
                <div className="textarea-container">
                    <label>Message</label>
                    <textarea />
                </div>
                <div className="submit-row">
                    <input type="submit" value="Send" className="submit-btn" />
                </div>
            </form>
    );
};

export default Contact;