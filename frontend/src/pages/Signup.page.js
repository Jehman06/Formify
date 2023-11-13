import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user.context";
import formify from '../assets/formify.png';
import './Auth.css';

const Signup = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // As explained in the Login page.
    const { emailPasswordSignup } = useContext(UserContext);
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    // As explained in the Login page.
    const onFormInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };


    // As explained in the Login page.
    const redirectNow = () => {
        const redirectTo = location.search.replace("?redirectTo=", "");
        navigate(redirectTo ? redirectTo : "/");
    }

    // As explained in the Login page.
    const onSubmit = async () => {
        try {
            const user = await emailPasswordSignup(form.email, form.password);
            if (user) {
                redirectNow();
            }
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className='login-container'>
            <div className='center-container'>
                <div className='logo-login'>
                    <img src={formify} alt='logo' />
                </div>
                <form className='login-form' style={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}>
                    <h1>Signup</h1>
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        name="email"
                        value={form.email}
                        onInput={onFormInputChange}
                        InputProps={{
                            style: { color: 'white' },
                        }}
                        InputLabelProps={{
                            style: { color: 'white' },
                        }}
                        color='warning'
                        style={{ marginBottom: "1rem" }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        name="password"
                        value={form.password}
                        onInput={onFormInputChange}
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
                        style={{ marginBottom: "1rem" }}
                    />
                    <Button variant="contained" color="warning" onClick={onSubmit}>
                        Signup
                    </Button>
                    <p>Have an account already? <Link to="/login" style={{ color: '#ffa726' }}>Login</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Signup;