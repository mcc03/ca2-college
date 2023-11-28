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

    return (

        // 'errors.title?.message': if there is a title show msg
        <>
            <h2>Create enrolment</h2>
            <form onSubmit={submitForm}>
                <div>Course ID: <input type="text" onChange={handleForm} value={form.course_id} name='course_id'/><span style={errorStyle}>{errors.course_id?.message}</span></div>
                
                <div>Lecturer ID: <input type="text" onChange={handleForm} value={form.lecturer_id} name='lecturer_id' /><span style={errorStyle}>{errors.lecturer_id?.message}</span></div>
                
                <div>Date: <input type="text" 
                onChange={handleForm} 
                value={form.date} 
                name='date' />
                <span style={errorStyle}>{errors.date?.message}</span>
                </div>

                <div>Time: <input type="text" 
                onChange={handleForm} 
                value={form.time} 
                name='time' />
                <span style={errorStyle}>{errors.time?.message}</span>
                </div>

                <div>Status: <input type="text" 
                onChange={handleForm} 
                value={form.status} 
                name='status' />
                <span style={errorStyle}>{errors.status?.message}</span>
                </div>
                

                {/* <div>Start date: <input type="date" pattern="\yyyy{4}-\mm{2}-\d{2}" onChange={handleForm} value={form.start_date} name='start_date' /></div>
                <div>End date: <input type="datetime-local" onChange={handleForm} value={form.end_date} name='end_date' /></div> */}

                <input type="submit"/>
            </form>

        </>
    );
}

export default Create;