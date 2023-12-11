import { useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl my-5">
                <h1 className="text-3xl font-semibold text-center text-black-700">Create a lecturer</h1>

            <form className="space-y-4" onSubmit={submitForm}>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Name</span>
                    </label>
                    <input type="text" placeholder="John Doe" 
                    className="w-full input input-bordered input-primary" onChange={handleForm} 
                    value={form.name} 
                    name='name'/><span 
                    style={errorStyle}>{errors.name?.message}</span>
                </div>

                <div>
                    <label className="label">
                        <span className="text-base label-text">Address</span>
                    </label>
                    <input type="text" placeholder="Road 99" 
                    className="w-full input input-bordered input-primary" onChange={handleForm} 
                    value={form.address} 
                    name='address'/><span 
                    style={errorStyle}>{errors.address?.message}</span>
                </div>

                <div>
                    <label className="label">
                        <span className="text-base label-text">Phone number</span>
                    </label>
                    <input type="text" placeholder="083 111 2222" 
                    className="w-full input input-bordered input-primary" onChange={handleForm} 
                    value={form.phone} 
                    name='phone'/><span 
                    style={errorStyle}>{errors.phone?.message}</span>
                </div>
                
                <div>
                    <label className="label">
                        <span className="text-base label-text">Email</span>
                    </label>
                    <input type="text" placeholder="JohnDoe@gmail.com" 
                    className="w-full input input-bordered input-primary" onChange={handleForm} 
                    value={form.email} 
                    name='email'/><span 
                    style={errorStyle}>{errors.email?.message}</span>
                </div>

{/* 
                <div>Start date: <input type="datetime-local" onChange={handleForm} value={form.start_date} name='start_date' /></div>
                <div>End date: <input type="datetime-local" onChange={handleForm} value={form.end_date} name='end_date' /></div> */}

                <button type="submit" className="btn btn-outline btn-success mt-4">Submit</button>

                <Link to="/lecturers"><button type="submit" className="btn btn-outline btn-error mt-4 ms-4">Cancel</button></Link>
            </form>
        </div>

        </>
    );
}

export default Create;