import React, {useState} from 'react';
import Layout from '../core/Layout';
import {Redirect} from 'react-router-dom';
import {signin, authenticate, isAuthenticated} from '../auth';

const Signin = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    });

    const {user} = isAuthenticated()

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const submitForm = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true})
        signin({email: email, password: password})
        .then(data => {
            if (data.error) {
                setValues({...values, error: data.error, loading: false})
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values, redirectToReferrer: true
                    });
                });
            }
        });
    }

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '': 'none'}}>
            {values.error}
        </div>
    );

    const showLoading = () => (
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        )
    );

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="/user/dashboard" />
            }
        }
    }

    const {email, password, error, loading, redirectToReferrer} = values;

    const signInForm = () => (
        <form className="">
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
        <Layout title="SignIn" description="Signin to Node React E-commerce App"
            className="container col-8 offset-2">
            {showLoading()}
            {showError()}  
            {signInForm()}
            {redirectUser()}
        </Layout>
    );
};

export default Signin;