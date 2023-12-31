import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Create = () => {

    const errorStyle = {
        color: 'red'
    };

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const [courses, setCourses] = useState([]);
    const [lecturers, setLecturers] = useState([]);

    let token = localStorage.getItem('token');

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

    const [form, setForm] = useState({
        course_id: "",
        lecturer_id: "",
        date: "",
        time: "",
        status: ""
        // start_date: "",
        // end_date: ""
    });

    const handleForm = (e) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    // const handleChange = (e) => {
    //     console.log(e.target.value);
    //     // setForm(prevState => ({
    //     //     ...prevState,
    //     //     [e.target.name]: e.target.value
    //     // }));
    // };

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

        if (isRequired(['course_id', 'lecturer_id', 'date', 'time', 'status'])) {
            let token = localStorage.getItem('token');

            axios.post('https://college-api.vercel.app/api/enrolments', form, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                navigate('/enrolments');
            })
            .catch(err => {
                console.error(err);
                setErrors(err.response.data.errors);
                console.log(err.response.data.errors);
            })
        }   
    }

    // map through courses to get all course IDs
    let courseOptions = courses.map((course) => {
        return <option value={course.id}>{course.title}</option>
    }); 

    // map through lecturers to get all lecturer IDs
    let lecturerOptions = lecturers.map((lecturer) => {
        return <option value={lecturer.id}>{lecturer.name}</option>
    }); 

    return (

        // 'errors.title?.message': if there is a title show msg
        <div className="bg-slate-100 py-10">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
            <h1 className="text-3xl font-semibold text-center text-black-700">Create an enrolment</h1>

            <form onSubmit={submitForm}>

            <div>
                    <label className="label">
                        <span className="text-base label-text">Select course</span>
                    </label>
                    <select className="w-full input input-bordered input-primary bg-white" name="course_id" onChange={handleForm}>
                        {courseOptions}
                    </select>
                    <span style={errorStyle}>{errors.course_id}</span>
                </div>

                <div>
                    <label className="label">
                        <span className="text-base label-text">Select lecturer</span>
                    </label>
                    <select className="w-full input input-bordered input-primary bg-white" name="lecturer_id" onChange={handleForm}>
                        {lecturerOptions}
                    </select>
                    <span style={errorStyle}>{errors.lecturer_id}</span>
                </div>

                <div>
                    <label className="label">
                        <span className="text-base label-text">Select date</span>
                    </label>
                    <input className="w-full input input-bordered input-primary bg-white" 
                    type="date" 
                    onChange={handleForm} 
                    value={form.date} 
                    name='date' />
                    <span style={errorStyle}>{errors.date}</span>
                </div>

                <div>
                    <label className="label">
                        <span className="text-base label-text">Select time</span>
                    </label>
                    <input className="w-full input input-bordered input-primary bg-white" 
                    type="time"
                    onChange={handleForm} 
                    value={form.time} 
                    name='time' />
                    <span style={errorStyle}>{errors.time}</span>
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
                    <span style={errorStyle}>{errors.status}</span>
                </div>

                <button type="submit" className="btn btn-outline btn-success mt-4">Submit</button>

                <Link to="/enrolments"><button type="submit" className="btn btn-outline btn-error mt-4 ms-4">Cancel</button></Link>
            </form>
        </div>
        </div>
    );
}

export default Create;