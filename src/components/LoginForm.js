import axios from "axios";
import { useState } from "react";

const LoginForm = ({ authenticated, onAuthenticated }) => {

    const errorStyle = {
        color: 'red'
    };

    const [form, setForm] = useState({
        email: "mcc@bloggs.com",
        password: "secret"
        });

        const [errorMessage, setErrorMessage] = useState("");

    const handleClick = () => {
        console.log("clicked", form)
        axios.post('https://college-api.vercel.app/api/login', {
            email: form.email,
            password: form.password
        })
        .then(response => {
            console.log(response.data)
            onAuthenticated(true, response.data.token);
        })
        .catch(err => {
            console.error(err)
            console.log(err.response.data.message)
            setErrorMessage(err.response.data.message)
        })
    };

    const handleForm = (e) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    return(
        <>
            Email: <input onChange={handleForm} type="text" name="email" value={form.email} /> <br/>
            Password: <input onChange={handleForm} type="password" name="password" value={form.password} />

            <button type="submit" onClick={handleClick}>Login</button>
            <p style={errorStyle}>{errorMessage}</p>
        </>
    );
}

export default LoginForm;