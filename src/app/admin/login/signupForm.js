
import { signUpValidations } from './validation';
import InputRow from 'components/admin/InputRow';
import { useForm } from 'hooks/useForm';
import { useFormSubmit } from 'hooks/useFormSubmit';
import Spinner from 'components/Spinner';

const FORM_VALUES = {
    username: '',
    email: '',
    password: '',
    confirm: ''
}

const SignUpForm = ({ setVisible }) => {

    const excludedFields = ['confirm'];
    const { data, errors } = useForm(FORM_VALUES);
    const { submit, isLoading, serverError } = useFormSubmit(
        data, 
        errors, 
        signUpValidations,
        '/users/signup',
        excludedFields
    );

    return (
        <Spinner visible={isLoading}>
            <form onSubmit={submit} action={null}>
                <button className="signup-back-btn" onClick={() => setVisible(false)}>
                    <i className="fa-regular fa-circle-left"></i>
                </button>
                <h3 className="login-title">Sign Up</h3>
                <p className="error-text">{serverError}</p>
                <InputRow 
                    inputType="text" 
                    inputName="username" 
                    label="Username"
                    formState={data}
                    formErrors={errors}
                />
                <InputRow 
                    inputType="text" 
                    inputName="email" 
                    label="Email"
                    formState={data}
                    formErrors={errors}
                />
                <InputRow 
                    inputType="password" 
                    inputName="password" 
                    label="Password"
                    formState={data}
                    formErrors={errors}
                />
                <InputRow 
                    inputType="password" 
                    inputName="confirm" 
                    label="Confirm Password"
                    formState={data}
                    formErrors={errors}
                />
                <section className="login-btn-row">
                    <input type="submit" className="login-submit" value="Register"/>
                </section>
            </form>
        </Spinner>
    );
};

export default SignUpForm;