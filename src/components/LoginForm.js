import axios from "axios";
import { useState } from "react";

const LoginForm = ({ authenticated, onAuthenticated }) => {

    const errorStyle = {
        color: 'red'
    };

    const [form, setForm] = useState({
        email: "mcc5@bloggs.com",
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
        <div className="bg-slate-100 py-10">
            <div className="relative flex flex-col justify-center overflow-hidden">
                <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
                    <h1 className="text-3xl font-semibold text-center text-black">Login</h1>
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="label">
                            <span className="text-gray-400 text-sm label-text ">Email</span>
                            </label>
                            <input 
                                className="w-full input input-bordered input-primary" 
                                onChange={handleForm} 
                                type="text" 
                                name="email" 
                                value={form.email} />
                        </div>

                        <div>
                            <label className="label">
                            <span className="text-gray-400 text-sm label-text">Password</span>
                            </label>
                            <input className="w-full input input-bordered input-primary" 
                                onChange={handleForm} 
                                type="password" 
                                name="password" 
                                value={form.password} />
                        </div>

                        <div>    
                            <button className="btn btn-primary text-black text-sm" type="submit" onClick={handleClick}>Login</button>
                            <p style={errorStyle}>{errorMessage}</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;