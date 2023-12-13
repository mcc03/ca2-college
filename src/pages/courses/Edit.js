import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Edit = () => {

    // takes id from url
    const { id } = useParams();
    const [courses, setCourses] = useState(null);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        title: "",
        description: "",
        level: "",
        code: "",
        points: ""
    });

    const errorStyle = {
        color: 'red'
    };

    let token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`https://college-api.vercel.app/api/courses/${id}`, {
            // important
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setCourses(response.data)
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

        if (isRequired(['title', 'description', 'level', 'code', 'points'])) {
            let token = localStorage.getItem('token');

            axios.put(`https://college-api.vercel.app/api/courses/${id}`, form, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                navigate(`/courses/${id}`);
            })
            .catch(err => {
                console.error(err);
            })
        }   
    }

    if(!courses) return <h4>Courses not found</h4>

    return (
        <div className="bg-slate-100">
                        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl my-10">

            <form className="space-y-4" onSubmit={submitForm}>

            <h1 className="text-3xl font-semibold text-center text-black">Edit course</h1>
                
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Title</span>
                        </label>
                            <input 
                            type="text" 
                            placeholder="New course" 
                            className="w-full input input-bordered input-primary bg-white" 
                            onChange={handleForm} 
                            value={form.title} 
                            name='title'/><span 
                            style={errorStyle}>{errors.title?.message}</span>
                    </div>

                    <div>
                        <label className="label">
                            <span className="text-base label-text">Description</span>
                        </label>
                            <input 
                            type="text" 
                            placeholder="New description" 
                            className="w-full input input-bordered input-primary bg-white" 
                            onChange={handleForm} 
                            value={form.description} 
                            name='description'/><span 
                            style={errorStyle}>{errors.description?.message}</span>
                    </div>

                    <div>
                        <label className="label">
                            <span className="text-base label-text">Level</span>
                        </label>
                            <input 
                            type="text" 
                            placeholder="8" 
                            className="w-full input input-bordered input-primary bg-white" 
                            onChange={handleForm} 
                            value={form.level} 
                            name='level'/><span 
                            style={errorStyle}>{errors.level?.message}</span>
                    </div>

                    <div>
                        <label className="label">
                            <span className="text-base label-text">Code</span>
                        </label>
                            <input 
                            type="text" 
                            placeholder="8" 
                            className="w-full input input-bordered input-primary bg-white" 
                            onChange={handleForm} 
                            value={form.code} 
                            name='code'/><span 
                            style={errorStyle}>{errors.code?.message}</span>
                    </div>

                    <div>
                        <label className="label">
                            <span className="text-base label-text">points</span>
                        </label>
                            <input 
                            type="text" 
                            placeholder="300" 
                            className="w-full input input-bordered input-primary bg-white" 
                            onChange={handleForm} 
                            value={form.points} 
                            name='points'/><span 
                            style={errorStyle}>{errors.points?.message}</span>
                    </div>

                    <div>
                    <label className="label">
                        <span className="text-base label-text">Select start date</span>
                    </label>
                    <input className="w-full input input-bordered input-primary bg-white" 
                    type="date" 
                    onChange={handleForm} 
                    value={form.start_date} 
                    name='start_date' />
                    <span style={errorStyle}>{errors.start_date?.message}</span>
                </div>

                <div>
                    <label className="label">
                        <span className="text-base label-text">Select end date</span>
                    </label>
                    <input className="w-full input input-bordered input-primary bg-white" 
                    type="date" 
                    onChange={handleForm} 
                    value={form.end_date} 
                    name='end_date' />
                    <span style={errorStyle}>{errors.end_date?.message}</span>
                </div>
                
                <button type="submit" className="btn btn-outline btn-success mt-4">Submit</button>
                <Link to="/courses"><button type="submit" className="btn btn-outline btn-error mt-4 ms-4">Cancel</button></Link>
            </form>
            </div>
        </div>
    );
}

export default Edit;