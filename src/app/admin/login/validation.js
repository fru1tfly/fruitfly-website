import { emailFormat, requireField } from "utils/validation";

export const signUpValidations = {
    username: {
        onSubmit: [
            (data) => requireField('Username', data.username)
        ],
        realTime: []
    },
    email: {
        onSubmit: [
            (data) => requireField('Email', data.email),
            (data) => emailFormat(data.email)
        ],
        realTime: [
            (data) => emailFormat(data.email)
        ]
    },
    password: {
        onSubmit: [
            (data) => requireField('Password', data.password)
        ],
        realTime: []
    },
    confirm: {
        onSubmit: [
            (data) => requireField('Confirm Password', data.confirm),
            (data) => data.confirm !== data.password && "Passwords do not match"
        ],
        realTime: []
    }
};


export const logInValidations = {
    username: {
        onSubmit: [
            (data) => requireField('Username', data.username)
        ],
        realTime: []
    },
    password: {
        onSubmit: [
            (data) => requireField('Password', data.password)
        ],
        realTime: []
    },
};
