import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
        <>
            <h2>Edit Courses</h2>

            <form onSubmit={submitForm}>
                <div>Title: <input type="text" onChange={handleForm} value={form.title} name='title'/><span style={errorStyle}>{errors.title?.message}</span></div>
                
                <div>Description: <input type="text" onChange={handleForm} value={form.description} name='description' /><span style={errorStyle}>{errors.description?.message}</span></div>
                
                <div>Code: <input type="text" 
                onChange={handleForm} 
                value={form.code} 
                name='code' />
                <span style={errorStyle}>{errors.code?.message}</span>
                </div>

                <div>Level: <input type="text" 
                onChange={handleForm} 
                value={form.level} 
                name='level' />
                <span style={errorStyle}>{errors.level?.message}</span>
                </div>

                <div>Points: <input type="text" 
                onChange={handleForm} 
                value={form.points} 
                name='points' />
                <span style={errorStyle}>{errors.points?.message}</span>
                </div>
                
                <div>Start date: <input type="datetime-local" onChange={handleForm} value={form.start_date} name='start_date' /></div>
                <div>End date: <input type="datetime-local" onChange={handleForm} value={form.end_date} name='end_date' /></div>
                <input type="submit"/>
            </form>
        </>
    );
}

export default Edit;