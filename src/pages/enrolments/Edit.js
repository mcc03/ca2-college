import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
        <>
            <h2>Edit Enrolment</h2>

            <form onSubmit={submitForm}>
                {/* <div>Name: <input type="text" onChange={handleForm} value={form.name} name='name'/><span style={errorStyle}>{errors.name?.message}</span></div> */}

                <div for="course_id">Select Course:
                    <select name="course_id" onChange={handleForm} value={form.course_id}>
                        {courseOptions}
                    </select><span style={errorStyle}>{errors.name?.message}</span>
                </div>

                <div for="lecturer_id">Select Lecturer:
                    <select name="lecturer_id" onChange={handleForm} value={form.lecturer_id}>
                        {lecturerOptions}
                    </select><span style={errorStyle}>{errors.name?.message}</span>
                </div>
                
                <div>Title: <input type="text" onChange={handleForm} value={form.title} name='title' /><span style={errorStyle}>{errors.title?.message}</span></div>
                
                <div>Code: <input type="text" 
                onChange={handleForm} 
                value={form.code} 
                name='code' />
                <span style={errorStyle}>{errors.code?.message}</span>
                </div>

                <div>Description: <input type="text" 
                onChange={handleForm} 
                value={form.description} 
                name='description' />
                <span style={errorStyle}>{errors.description?.message}</span>
                </div>

                {/* dropdown menu */}
                <div for="status" 
                value={form.status} 
                name='staus'>Select a status:
                    <select name="status" onChange={handleForm}>
                        <option value="assigned">Assigned</option>
                        <option value="interested">Interested</option>
                        <option value="associate">Associate</option>
                        <option value="career_break">Career break</option>
                    </select>
                </div>
                
                <div>Date: <input type="date" 
                    onChange={handleForm} 
                    value={form.date} 
                    name='date' />
                    <span style={errorStyle}>{errors.date?.message}</span>
                </div>

                <div>Time: <input type="time" 
                    onChange={handleForm} 
                    value={form.time} 
                    name='time' />
                    <span style={errorStyle}>{errors.time?.message}</span>
                </div>

                <input type="submit"/>
            </form>
        </>
    );
}

export default Edit;