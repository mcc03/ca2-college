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
            })
        }   
    }

    return (

        // 'errors.title?.message': if there is a title show msg
        <>
            <h2>Create course</h2>
            <form onSubmit={submitForm}>
                <div>Title: <input type="text" onChange={handleForm} value={form.title} name='title'/><span style={errorStyle}>{errors.title?.message}</span></div>
                
                <div>Code: <input type="text" onChange={handleForm} value={form.code} name='code' /><span style={errorStyle}>{errors.code?.message}</span></div>
                
                <div>Description: <input type="text" 
                onChange={handleForm} 
                value={form.description} 
                name='description' />
                <span style={errorStyle}>{errors.description?.message}</span>
                </div>

                <div>Points: <input type="text" 
                onChange={handleForm} 
                value={form.points} 
                name='points' />
                <span style={errorStyle}>{errors.points?.message}</span>
                </div>

                <div>Level: <input type="text" 
                onChange={handleForm} 
                value={form.level} 
                name='level' />
                <span style={errorStyle}>{errors.level?.message}</span>
                </div>
{/* 
                <div>Start date: <input type="datetime-local" onChange={handleForm} value={form.start_date} name='start_date' /></div>
                <div>End date: <input type="datetime-local" onChange={handleForm} value={form.end_date} name='end_date' /></div> */}

                <input type="submit"/>
            </form>

        </>
    );
}

export default Create;