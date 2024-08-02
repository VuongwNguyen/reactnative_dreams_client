import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name cannot be empty'),
  lastName: Yup.string()
    .required('Last name cannot be empty'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email cannot be empty'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number invalid')
    .required('Phone number cannot be empty'),
  password: Yup.string()
    .min(8, 'Password should be 8 chars')
    .required('Password cannot be empty'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password cannot be empty'),
});