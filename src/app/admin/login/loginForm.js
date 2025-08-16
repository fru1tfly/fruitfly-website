import { logInValidations } from './validation';
import { FormValueType } from 'types/FormValueType';
import Form from 'components/admin/Form';
import { getUserInfo } from 'utils';
import { useContext } from 'react';
import { UserUpdateContext } from 'stores/UserContext';

const fieldMapping = {
    username: {
        type: FormValueType.TEXT
    },
    password: {
        type: FormValueType.PASSWORD
    }
};

const LoginForm = ({ setVisible }) => {
    const setUserInfo = useContext(UserUpdateContext);

    const formHeader = (serverError) => (
        <>
            <h3 className="login-title">FruitNet<sup>TM</sup></h3>
            <p className="error-text">{serverError}</p>
        </>
    );

    const formFooter = () => (
        <section className="login-btn-row">
            <input type="submit" className="login-submit" value="Log In"/>
            <button className="login-submit login-submit-alt" onClick={() => setVisible(true)}>Sign Up</button>
        </section>
    );

    const definition = {
        mapping: fieldMapping,
        validations: logInValidations
    }

    const callback = (response) => {
        sessionStorage.setItem("jwt", response.token);
        setUserInfo(getUserInfo());
    }

    return (
        <Form 
            definition={definition}
            endpoint="/users/login"
            header={formHeader}
            footer={formFooter}
            callback={callback}
        />
    );
};

export default LoginForm;