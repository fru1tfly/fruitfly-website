import { useState } from 'react';

import Card from 'components/Card';
import SignUpForm from './signupForm';
import LoginForm from './loginForm';

const Login = () => {

    const [showSignUp, setShowSignUp] = useState(false);

    return (
        <Card className={`full-center login-card ${showSignUp ? 'tall' : ''}`}>
            {showSignUp && <SignUpForm setVisible={setShowSignUp} />}
            {!showSignUp && <LoginForm setVisible={setShowSignUp} />}
        </Card>
    );
};

export default Login;