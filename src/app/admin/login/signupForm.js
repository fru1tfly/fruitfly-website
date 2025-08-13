
import { signUpValidations } from './validation';
import Form from 'components/admin/Form';
import { FormValueType } from 'types/FormValueType';

const fieldMapping = {
    username: {
        type: FormValueType.TEXT
    },
    email: {
        type: FormValueType.TEXT
    },
    password: {
        type: FormValueType.PASSWORD
    },
    confirm: {
        type: FormValueType.PASSWORD,
        label: "Confirm Password"
    }
};

const SignUpForm = ({ setVisible }) => {

    const formHeader = (serverError) => (
        <>
            <button className="signup-back-btn" onClick={() => setVisible(false)}>
                <i className="fa-regular fa-circle-left"></i>
            </button>
            <h3 className="login-title">Sign Up</h3>
            <p className="error-text">{serverError}</p>
        </>
    );

    const formFooter = () => (
        <section className="login-btn-row">
            <input type="submit" className="login-submit" value="Register"/>
        </section>
    );

    const definition = {
        mapping: fieldMapping,
        validations: signUpValidations
    }

    return (
        <Form 
            definition={definition}
            endpoint="/users/signup"
            header={formHeader}
            footer={formFooter}
        />
    );
};

export default SignUpForm;