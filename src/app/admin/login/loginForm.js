import InputRow from 'components/admin/InputRow';
import { useForm } from 'hooks/useForm';
import { useFormSubmit } from 'hooks/useFormSubmit';
import Spinner from 'components/Spinner';
import { logInValidations } from './validation';

const FORM_VALUES = {
    username: '',
    password: ''
}

const LoginForm = ({ setVisible }) => {

    const { data, errors } = useForm(FORM_VALUES);
    const { submit, isLoading, serverError } = useFormSubmit(
        data, 
        errors, 
        logInValidations, 
        '/users/login'
    );
    
    return (
        <Spinner visible={isLoading}>
            <form onSubmit={submit} action={null}>
                <h3 className="login-title">FruitNet<sup>TM</sup></h3>
                <p className="error-text">{serverError}</p>
                <InputRow 
                    inputType="text" 
                    inputName="username" 
                    label="Username"
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
                <section className="login-btn-row">
                    <input type="submit" className="login-submit" value="Log In"/>
                    <button className="login-submit login-submit-alt" onClick={() => setVisible(true)}>Sign Up</button>
                </section>
            </form>
        </Spinner>
    );
};

export default LoginForm;