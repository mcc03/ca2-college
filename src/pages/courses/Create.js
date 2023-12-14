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
        title: "",
        code: "",
        description: "",
        points: "",
        level: ""
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
                    [field] : `${field} is required`
                }));
            }
        });

        return included;
    };

    const submitForm = (e) => {
        e.preventDefault();
        console.log("submitted", form)

        if (isRequired(['title', 'code', 'description', 'level', 'points'])) {
            let token = localStorage.getItem('token');

            axios.post('https://college-api.vercel.app/api/courses', form, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                navigate('/courses');
            })
            .catch(err => {
                console.error(err);
                setErrors(err.response.data.errors);
                console.log("errors: ", err.response.data.errors);
                
            })
        }   
    }

    // let levelErrors = errors.level.map((err) => {
    //     return <span style={errorStyle}>{err}</span>

    // })

    return (

        // 'errors.title?.message': if there is a title show msg
        <div className="bg-slate-100 py-10">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-black">Create a course</h1>
                
                <form className="space-y-4" onSubmit={submitForm}>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Title</span>
                        </label>
                        <input type="text" placeholder="New Course" 
                        className="w-full input input-bordered input-primary bg-white" 
                        onChange={handleForm} 
                        value={form.title} 
                        name='title'/><span 
                        style={errorStyle}>{errors.title?.message}</span>
                    </div>

                    <div>
                        <label className="label">
                            <span className="text-base label-text">Code</span>
                        </label>
                        <input type="text" placeholder="NA000" 
                        className="w-full input input-bordered input-primary bg-white" 
                        onChange={handleForm} 
                        value={form.code} 
                        name='code'/><span 
                        style={errorStyle}>{errors.code?.message}</span>
                    </div>

                    <div>
                        <label className="label">
                            <span className="text-base label-text">Description</span>
                        </label>
                        <input type="text" placeholder="This course is about..." 
                        className="w-full input input-bordered input-primary bg-white" 
                        onChange={handleForm} 
                        value={form.description} 
                        name='description'/><span 
                        style={errorStyle}>{errors.description?.message}</span>
                    </div>
                    
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Points</span>
                        </label>
                        <input type="text" placeholder="300" 
                        className="w-full input input-bordered input-primary bg-white" 
                        onChange={handleForm} 
                        value={form.points} 
                        name='points'/><span 
                        style={errorStyle}>{errors.points?.message}</span>
                    </div>

                    <div>
                        <label className="label">
                            <span className="text-base label-text">Level</span>
                        </label>
                        <input type="text" placeholder="8" 
                        className="w-full input input-bordered input-primary bg-white" 
                        onChange={handleForm} 
                        value={form.level} 
                        name='level'/>
                        
                        <span style={errorStyle}>{errors.level}</span>
                        
                        
                        
                    </div>

    {/* 
                    <div>Start date: <input type="datetime-local" onChange={handleForm} value={form.start_date} name='start_date' /></div>
                    <div>End date: <input type="datetime-local" onChange={handleForm} value={form.end_date} name='end_date' /></div> */}

                    <button type="submit" className="btn btn-outline btn-success mt-4">Submit</button>

                    <Link to="/courses"><button type="submit" className="btn btn-outline btn-error mt-4 ms-4">Cancel</button></Link>
                </form>
            </div>
        </div>
    );
}

export default Create;