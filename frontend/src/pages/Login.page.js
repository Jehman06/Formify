import { Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user.context";
import formify from '../assets/formify.png';
import './Auth.css';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // We are using our user-management context to
    // get & set the user details here
    const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);

    // We are useState to keep track of the form values.
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    // This function will be called whenever the user edits the form.
    const onFormInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    // This function will redirect the user to the
    // appropriate page once the authentication is done.
    const redirectNow = () => {
        const redirectTo = location.search.replace("?redirectTo=", "");
        navigate(redirectTo ? redirectTo : "/");
    }

    // Once a user logs in to our app, we don’t want to ask them for their
    // credentials again every time the user refreshes or revisits our app, 
    // so we are checking if the user is already logged in and
    // if so we are redirecting the user to the home page.
    // Otherwise we will do nothing and let the user to login.
    const loadUser = async () => {
        if (!user) {
            const fetchedUser = await fetchUser();
            if (fetchedUser) {
                // Redirecting them once fetched.
                redirectNow();
            }
        }
    }

    // This useEffect will run only once when the component is mounted.
    // This is helping us in verifying whether the user is already logged in
    // or not.
    useEffect(() => {
        loadUser();
    }, []);

    // This function is called when the user clicks on the "Login" button.
    const onSubmit = async (event) => {
        try {
            // Passing user details to our emailPasswordLogin
            // function that we imported from our realm/authentication.js
            // to validate the user credentials and log in the user into the app.
            const user = await emailPasswordLogin(form.email, form.password);
            if (user) {
                redirectNow();
            }
        } catch (error) {
            if (error.statusCode === 401) {
                alert("Invalid username/password. Try again!");
            } else {
                alert(error);
            }
        }
    };

    // Redirects to the page
    const resetPasswordNav = () => {
        navigate('/reset-password')
    }

    return (
        <div className='login-container'>
            <div className='center-container'>
                <div className='logo-login'>
                    <img src={formify} alt='logo' />
                </div>
                <form className='login-form' style={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}>
                    <h1 style={{ marginBottom: '15px' }}>Login</h1>
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        name="email"
                        value={form.email}
                        onChange={onFormInputChange}
                        InputProps={{
                            style: { color: 'white' },
                        }}
                        InputLabelProps={{
                            style: { color: 'white' },
                        }}
                        color='warning'
                        style={{ marginBottom: '1rem', backgroundColor: 'transparent' }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        name="password"
                        value={form.password}
                        onChange={onFormInputChange}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                onSubmit();
                            }
                        }}
                        InputProps={{
                            style: { color: 'white' },
                        }}
                        InputLabelProps={{
                            style: { color: 'white' },
                        }}
                        color='warning'
                        style={{ marginBottom: "1rem", backgroundColor: 'transparent' }}
                    />
                    <Button variant="contained" color="warning" onClick={onSubmit}>
                        Login
                    </Button>
                    <p onClick={resetPasswordNav} style={{ color: '#ffa726', textDecoration: 'underline' }}>Forgot your password?</p>
                    <p>Don't have an account? <Link to="/signup" style={{ color: '#ffa726' }}>Signup</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login;