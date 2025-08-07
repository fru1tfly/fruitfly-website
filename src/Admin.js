import './admin.css';
import Card from './admin/Card';
import axios from 'axios';


const Admin = () => {

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');

        //axios.post(`${process.env.REACT_APP_API_ENDPOINT}`)
        axios.post(
            `${process.env.REACT_APP_API_ENDPOINT}/shows/create`,
            {
                venue_id: 1,
                showName: '',
                date: (new Date()).setMonth(new Date().getMonth() + 1),
                imgUrl: '',
                otherActs: 'Loded Diper',
                doorsTime: '7PM',
                showTime: '8PM',
                setTime: '',
                ticketUrl: '',
                price: ''
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
    }

    return (
        <div className="admin-bg">
            <Card className="full-center login-card">
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" className="login-input"></input>
                    <input type="password" name="password" className="login-input"></input>
                    <input type="submit" className="login-submit" value="Log In"/>
                </form>
            </Card>
        </div>
    );
}

export default Admin;