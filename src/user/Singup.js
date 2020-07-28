import React, {useState} from 'react';
import Layout from '../core/Layout';
import API from '../config';

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
    }

    const signup = (user) => {
        //console.log(name, email, password);
        fetch(`${API}/signup`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        })
    };

    const {name, email, password} = values;

    const signUpForm = () => (
        <form className="">
            <div className="form-group">
                <label className="text-muted">Name: </label>
                <input onChange={handleChange('name')} type="text" className="form-control" name="name"/>
            </div>
            <div className="form-group">
                <label className="text-muted">Email: </label>
                <input onChange={handleChange('email')} type="text" className="form-control" name="email"/>
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
            {signUpForm()}
        </Layout>
    );
};

export default Signup;