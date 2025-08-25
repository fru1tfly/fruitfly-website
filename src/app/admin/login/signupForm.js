
import { signUpValidations } from './validation';
import Form from 'components/admin/Form';
import { FormValueType } from 'types/FormValueType';
import { getUserInfo } from 'utils';
import { useContext } from 'react';
import { UserUpdateContext } from 'stores/UserContext';

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
    const setUserInfo = useContext(UserUpdateContext);

    const formHeader = (serverError) => (
        <>
            <button className="signup-back-btn" onClick={() => setVisible(false)}>
                <i className="fa-regular fa-circle-left"></i>
            </button>
            <h3 className="login-title">Sign Up</h3>
            {serverError && <p className="error-text">{serverError}</p>}
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

    const callback = (response) => {
        sessionStorage.setItem("jwt", response.token);
        setUserInfo(getUserInfo());
    }

    return (
        <Form 
            definition={definition}
            endpoint="/users/signup"
            header={formHeader}
            footer={formFooter}
            callback={callback}
        />
    );
};

export default SignUpForm;