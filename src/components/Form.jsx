import React, { useState } from 'react';

const RegistrationForm = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (event) => {
    if (!isNaN(event.target.value)) {
      setErrors({
        ...errors,
        [event.target.name]: 'Input should not be a number.',
      });
    } else {
      setErrors({
        ...errors,
        [event.target.name]: '',
      });
    }

    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = () => {
    let tempErrors = {};
    let formIsValid = true;

    if (!form.firstName) {
      formIsValid = false;
      tempErrors['firstName'] = 'Please enter your first name.';
    }

    if (!form.lastName) {
      formIsValid = false;
      tempErrors['lastName'] = 'Please enter your last name.';
    }

    if (!form.email) {
      formIsValid = false;
      tempErrors['email'] = 'Please enter your email.';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      formIsValid = false;
      tempErrors['email'] = 'Email is not valid.';
    }

    setErrors(tempErrors);
    return formIsValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.firstName && !form.lastName && !form.email) {
      alert('Form cannot be submitted empty.');
    } else if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  return (
    <div>
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" value={form.firstName} onChange={handleInputChange} placeholder="First Name" />
        {errors.firstName && <p>{errors.firstName}</p>}
        <input type="text" name="lastName" value={form.lastName} onChange={handleInputChange} placeholder="Last Name" />
        {errors.lastName && <p>{errors.lastName}</p>}
        <input type="email" name="email" value={form.email} onChange={handleInputChange} placeholder="Email" />
        {errors.email && <p>{errors.email}</p>}
        <button type="submit">Register</button>
      </form>
      {isSubmitted && <p>Registration Successful!</p>}
    </div>
  );
};

export default RegistrationForm;
