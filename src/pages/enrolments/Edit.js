import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Edit = () => {

    // takes id from url
    const { id } = useParams();
    const [enrolments, SetEnrolments] = useState(null);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        course_id: "",
        lecturer_id: "",
        title: "",
        code: "",
        description: "",
        status: "",
        date: "",
        time: ""
    });

    const errorStyle = {
        color: 'red'
    };

    let token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`https://college-api.vercel.app/api/enrolments/${id}`, {
            // important
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                SetEnrolments(response.data)
                console.log(response.data)
                setForm(response.data)
            })
                .catch(err => {
                    console.error(err);
            })
    }, [id])

    const [courses, setCourses] = useState([]);
    const [lecturers, setLecturers] = useState([]);

    // getting courses
    useEffect(() => {
        axios.get('https://college-api.vercel.app/api/courses', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log("courses")
            console.log(response.data.data);
            setCourses(response.data.data);

        })
        .catch(error => {
            console.error(error);
        });

    }, []);

    // getting lecturers
    useEffect(() => {
        axios.get('https://college-api.vercel.app/api/lecturers', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log("lecturers")
            console.log(response.data.data);
            setLecturers(response.data.data);

        })
        .catch(error => {
            console.error(error);
        });

    }, []);

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

        if (isRequired(['course_id', 'lecturer_id', 'title', 'code', 'description', 'status', 'date', 'time'])) {
            let token = localStorage.getItem('token');

            axios.put(`https://college-api.vercel.app/api/enrolments/${id}`, form, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                navigate(`/enrolments/${id}`);
            })
            .catch(err => {
                console.error(err);
            })
        }   
    }

    if(!enrolments) return <h4>Enrolment not found</h4>

    // map through courses to get all course IDs
    let courseOptions = courses.map((course) => {
        return <option value={course.id}>{course.title}</option>
    }); 

    // map through lecturers to get all lecturer IDs
    let lecturerOptions = lecturers.map((lecturer) => {
        return <option value={lecturer.id}>{lecturer.name}</option>
    }); 

    return (
        <div className="bg-slate-100">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl my-10">

        <form className="space-y-4" onSubmit={submitForm}>

        <h1 className="text-3xl font-semibold text-center text-black">Edit enrolment</h1>
            
        <div>
                    <label className="label">
                        <span className="text-base label-text">Edit course</span>
                    </label>
                    <select className="w-full input input-bordered input-primary bg-white" name="course_id" onChange={handleForm}>
                        {courseOptions}
                    </select>
                </div>

                <div>
                    <label className="label">
                        <span className="text-base label-text">Edit lecturer</span>
                    </label>
                    <select className="w-full input input-bordered input-primary bg-white" name="lecturer_id" onChange={handleForm}>
                        {lecturerOptions}
                    </select>
                </div>

                <div>
                    <label className="label">
                        <span className="text-base label-text">Edit title</span>
                    </label>
                        <input 
                        type="text" 
                        placeholder="New title" 
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
                        <input 
                        type="text" 
                        placeholder="NA000" 
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
                        <input 
                        type="text" 
                        placeholder="New description..." 
                        className="w-full input input-bordered input-primary bg-white" 
                        onChange={handleForm} 
                        value={form.description} 
                        name='description'/><span 
                        style={errorStyle}>{errors.description?.message}</span>
                </div>

                <div for="status">
                    <label className="label">
                        <span className="text-base label-text">Select status</span>
                    </label>
                    <select className="w-full input input-bordered input-primary bg-white" 
                    name="status" onChange={handleForm}>
                    <option value="assigned">Assigned</option>
                    <option value="interested">Interested</option>
                    <option value="associate">Associate</option>
                    <option value="career_break">Career break</option>
                    </select>
                </div>

                <div>
                    <label className="label">
                        <span className="text-base label-text">Edit date</span>
                    </label>
                    <input className="w-full input input-bordered input-primary bg-white" 
                    type="date" 
                    onChange={handleForm} 
                    value={form.date} 
                    name='date' />
                    <span style={errorStyle}>{errors.date?.message}</span>
                </div>

                <div>
                    <label className="label">
                        <span className="text-base label-text">Edit time</span>
                    </label>
                    <input className="w-full input input-bordered input-primary bg-white" 
                    type="time" 
                    onChange={handleForm} 
                    value={form.time} 
                    name='time' />
                    <span style={errorStyle}>{errors.time?.message}</span>
                </div>

            <button type="submit" className="btn btn-outline btn-success mt-4">Submit</button>
            <Link to="/courses"><button type="submit" className="btn btn-outline btn-error mt-4 ms-4">Cancel</button></Link>
        </form>
        </div>
    </div>
    );
}

export default Edit;