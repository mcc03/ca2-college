import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Edit = () => {

    // takes id from url
    const { id } = useParams();
    const [lecturers, setLecturers] = useState(null);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        name: "",
        address: "",
        phone: "",
        email: ""
    });

    const errorStyle = {
        color: 'red'
    };

    let token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`https://college-api.vercel.app/api/lecturers/${id}`, {
            // important
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setLecturers(response.data)
                console.log(response.data)
                setForm(response.data)
            })
                .catch(err => {
                    console.error(err);
            })
    }, [id])

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

            axios.put(`https://college-api.vercel.app/api/lecturers/${id}`, form, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                navigate(`/lecturers/${id}`);
            })
            .catch(err => {
                console.error(err);
            })
        }   
    }

    if(!lecturers) return <h4>Lecturer not found</h4>

    return (
        <>
            <h2>Edit Courses</h2>

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
                
                {/* <div>Start date: <input type="datetime-local" onChange={handleForm} value={form.start_date} name='start_date' /></div>
                <div>End date: <input type="datetime-local" onChange={handleForm} value={form.end_date} name='end_date' /></div> */}
                <input type="submit"/>
            </form>
        </>
    );
}

export default Edit;