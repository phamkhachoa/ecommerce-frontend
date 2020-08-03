import React, {useState} from 'react';
import Layout from '../core/Layout';
import {Link} from 'react-router-dom';
import {signup} from '../auth';

const Signup = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const submitForm = (event) => {
        event.preventDefault();
        signup({name: name, email: email, password: password})
        .then(data => {
            if (data.error) {
                setValues({...values, error: data.error, success: false})
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                })
            }
        })
    }

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '': 'none'}}>
            {values.error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{display: success ? '': 'none'}}>
            New account is created. Please <Link to="/signin">Signin!</Link>
        </div>
    );

    const {name, email, password, error, success} = values;

    const signUpForm = () => (
        <form className="">
            <div className="form-group">
                <label className="text-muted">Name: </label>
                <input onChange={handleChange('name')} type="text" className="form-control" name="name"
                    value={name}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Email: </label>
                <input onChange={handleChange('email')} type="text" className="form-control" name="email"
                    value={email}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Password: </label>
                <input onChange={handleChange('password')} type="password" className="form-control" name="password"/>
            </div>
            <button onClick={submitForm} type="submit" className="btn btn-primary">Submit</button>
        </form>
    );

    return (
        <Layout title="SigninUp" description="Signup to Node React E-commerce App"
            className="container col-8 offset-2">
            {showError()}
            {showSuccess()}  
            {signUpForm()}
        </Layout>
    );
};

export default Signup;