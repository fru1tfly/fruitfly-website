import { logInValidations } from './validation';
import { FormValueType } from 'types/FormValueType';
import Form from 'components/admin/Form';

const fieldMapping = {
    username: {
        type: FormValueType.TEXT
    },
    password: {
        type: FormValueType.PASSWORD
    }
};

const LoginForm = ({ setVisible }) => {

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

    return (
        <Form 
            definition={definition}
            endpoint="/users/login"
            header={formHeader}
            footer={formFooter}
        />
    );
};

export default LoginForm;