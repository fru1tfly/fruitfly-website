const Contact = () => {
    return (
            <form>
                <div className="booking-message">
                    <p>Booking inquiries: <strong style={{fontFamily: "'Times New Roman', Times, serif", fontSize: "18px"}}>booking@fruitfly.band</strong></p>
                    <p style={{fontSize: "12px"}}>For other inquiries, use the form below</p>
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
                <div>
                    <label>Message</label>
                    <textarea rows="14"/>
                </div>
                <div className="submit-row">
                    <input type="submit" value="Send" className="submit-btn" />
                </div>
            </form>
    );
};

export default Contact;