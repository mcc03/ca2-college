import { useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Create = () => {

    const errorStyle = {
        color: 'red'
    };


    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        name: "",
        address: "",
        phone: "",
        email: ""
        // start_date: "",
        // end_date: ""
    });

    const handleForm = (e) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    // error handling
    const isRequired = (fields) => {

        let included = true;
        setErrors({});

        fields.forEach(field => {

            if (!form[field]) {
                // console.log(`${field} is required`);

                included = true;
                setErrors(prevState => ({
                    ...prevState,
                    [field] : {
                        message: `${field} is required`
                    }
                }));
            }
        });

        return included;
    };

    const submitForm = (e) => {
        e.preventDefault();
        console.log("submitted", form)

        if (isRequired(['name', 'address', 'phone', 'email'])) {
            let token = localStorage.getItem('token');

            axios.post('https://college-api.vercel.app/api/lecturers', form, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                navigate('/lecturers');
            })
            .catch(err => {
                console.error(err);
            })
        }   
    }

    return (

        // 'errors.title?.message': if there is a title show msg
        <>
            <h2>Create lecturer</h2>
            <form onSubmit={submitForm}>
                <div>Name: <input type="text" onChange={handleForm} value={form.name} name='name'/><span style={errorStyle}>{errors.name?.message}</span></div>
                
                <div>Address: <input type="text" onChange={handleForm} value={form.address} name='address' /><span style={errorStyle}>{errors.address?.message}</span></div>
                
                <div>Phone: <input type="text" 
                onChange={handleForm} 
                value={form.phone} 
                name='phone' />
                <span style={errorStyle}>{errors.phone?.message}</span>
                </div>

                <div>Email: <input type="text" 
                onChange={handleForm} 
                value={form.email} 
                name='email' />
                <span style={errorStyle}>{errors.email?.message}</span>
                </div>
                
{/* 
                <div>Start date: <input type="datetime-local" onChange={handleForm} value={form.start_date} name='start_date' /></div>
                <div>End date: <input type="datetime-local" onChange={handleForm} value={form.end_date} name='end_date' /></div> */}

                <input type="submit"/>
            </form>

        </>
    );
}

export default Create;