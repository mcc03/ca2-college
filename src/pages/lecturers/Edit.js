import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

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
        <div className="bg-slate-100">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl my-10">

            <form className="space-y-4" onSubmit={submitForm}>

            <h1 className="text-3xl font-semibold text-center text-black">Edit lecturer</h1>
                
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Name</span>
                        </label>
                            <input 
                            type="text" 
                            placeholder="John Doe" 
                            className="w-full input input-bordered input-primary bg-white" 
                            onChange={handleForm} 
                            value={form.name} 
                            name='name'/><span 
                            style={errorStyle}>{errors.name?.message}</span>
                    </div>

                    <div>
                        <label className="label">
                            <span className="text-base label-text">Address</span>
                        </label>
                            <input 
                            type="text" 
                            placeholder="Road 99" 
                            className="w-full input input-bordered input-primary bg-white" 
                            onChange={handleForm} 
                            value={form.address} 
                            name='address'/><span 
                            style={errorStyle}>{errors.address?.message}</span>
                    </div>

                    <div>
                        <label className="label">
                            <span className="text-base label-text">Phone number</span>
                        </label>
                            <input 
                            type="text" 
                            placeholder="0831459546" 
                            className="w-full input input-bordered input-primary bg-white" 
                            onChange={handleForm} 
                            value={form.phone} 
                            name='phone'/><span 
                            style={errorStyle}>{errors.phone?.message}</span>
                    </div>

                    <div>
                        <label className="label">
                            <span className="text-base label-text">Email</span>
                        </label>
                            <input 
                            type="text" 
                            placeholder="JohnDoe@gmail.com" 
                            className="w-full input input-bordered input-primary bg-white" 
                            onChange={handleForm} 
                            value={form.email} 
                            name='email'/><span 
                            style={errorStyle}>{errors.email?.message}</span>
                    </div>

                <button type="submit" className="btn btn-outline btn-success mt-4">Submit</button>
                <Link to="/courses"><button type="submit" className="btn btn-outline btn-error mt-4 ms-4">Cancel</button></Link>
            </form>
            </div>
        </div>
    );
}

export default Edit;