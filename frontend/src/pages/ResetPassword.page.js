import { Button, TextField, Snackbar } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user.context";

const ResetPassword = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);

    // We are consuming our user-management context
    const { app } = useContext(UserContext);

    // We are using React's "useState" hook to keep track
    //  of the form values.
    const [form, setForm] = useState({
        email: "",
    });

    // This function will be called whenever the user edits the form.
    const onFormInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    // This function gets fired when the user clicks on the "Reset Password" button.
    const onSubmit = async () => {
        const email = form.email;
        try {
            await app.emailPasswordAuth.sendResetPasswordEmail({ email });
            navigate('/reset-password-confirm');
        } catch (error) {
            // Handle error (e.g., email not found)
            setErrorMessage('Error sending reset password email')
            console.error('Error sending reset password email:', error);
        }
    };

    return (
        <div>
            <form style={{ display: "flex", flexDirection: "column", maxWidth: "300px", margin: "auto" }}>
                <h1>Reset Password</h1>
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    name="email"
                    value={form.email}
                    onChange={onFormInputChange}
                    style={{ marginBottom: "1rem" }}
                />

                <Button variant="contained" color="primary" onClick={onSubmit}>
                    Reset Password
                </Button>

            </form>
            <Snackbar
                open={errorMessage !== null}
                autoHideDuration={6000} // Adjust as needed
                onClose={() => setErrorMessage(null)}
                message={errorMessage}
            />
        </div>
    )
}


export default ResetPassword;