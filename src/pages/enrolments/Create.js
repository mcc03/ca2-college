import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        <>
            <h2>Create enrolment</h2>
            <form onSubmit={submitForm}>

                <div for="course_id">Select a course_id:
                    <select name="course_id" onChange={handleForm}>
                        {courseOptions}
                    </select>
                </div>
                
                
                <div for="lecturer_id">Select a lecturer_id:
                    <select name="lecturer_id" onChange={handleForm}>
                        {lecturerOptions}
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

                {/* <div>Status: <input type="text" 
                onChange={handleForm} 
                value={form.status} 
                name='status' />
                <span style={errorStyle}>{errors.status?.message}</span>
                </div> */}

                {/* dropdown menu */}
                <div for="status">Select a status:
                    <select name="status" onChange={handleForm}>
                    <option value="assigned">Assigned</option>
                    <option value="interested">Interested</option>
                    <option value="associate">Associate</option>
                    <option value="career_break">Career break</option>
                    </select>
                </div>

                <input type="submit"/>
            </form>
        </>
    );
}

export default Create;