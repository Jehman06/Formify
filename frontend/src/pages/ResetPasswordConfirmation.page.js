import { Button, TextField, Snackbar } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user.context";

const ResetPasswordConfirmation = () => {
    const navigate = useNavigate();

    // We are consuming our user-management context
    const { app } = useContext(UserContext);

    // We are using React's "useState" hook to keep track
    //  of the form values.
    const [form, setForm] = useState({
        password: '',
        token: '',
        tokenId: '',
    });

    // This function will be called whenever the user edits the form.
    const onFormInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    // This function gets fired when the user clicks on the "Reset Password" button.
    const onSubmit = async () => {
        const password = form.password;
        const token = form.token;
        const tokenId = form.tokenId;

        await app.emailPasswordAuth.resetPassword({
            password: password,
            token: token,
            tokenId: tokenId,
        })
    }

    return (
        <form style={{ display: "flex", flexDirection: "column", maxWidth: "300px", margin: "auto" }}>
            <h1>Reset Password</h1>
            <TextField
                label="Token"
                type="token"
                variant="outlined"
                name="token"
                value={form.token}
                onChange={onFormInputChange}
                style={{ marginBottom: "1rem" }}
            />

            <TextField
                label="Token ID"
                type="tokenid"
                variant="outlined"
                name="tokenid"
                value={form.tokenId}
                onChange={onFormInputChange}
                style={{ marginBottom: "1rem" }}
            />

            <Button variant="contained" color="primary" onClick={onSubmit}>
                Reset Password
            </Button>

        </form>
    )
}

export default ResetPasswordConfirmation;