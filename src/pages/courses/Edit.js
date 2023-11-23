import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../config/api";

const Edit = () => {

    let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOTBiNmRiZDQ3OWI5N2RmNmJkNzQxMmVjYThkMmI4N2JlNzczMjFmMTkwMTJlOGU1YTlmMzVhMDU3Mzg1OGQyMmQ4MTVjODFkZDhkMTQ4NjAiLCJpYXQiOiIxNzAwNzM0NjQwLjk0MDM0NSIsIm5iZiI6IjE3MDA3MzQ2NDAuOTQwMzQ4IiwiZXhwIjoiMTczMjM1NzA0MC45Mjg5ODkiLCJzdWIiOiIxNSIsInNjb3BlcyI6W119.mpBE_T4_irjKSRjGRz0goK0sxHPIheKKNFPFUmdiauZKGV2dGZHdvNIo3h0aB_ok8aTPhk7JXw2Pw5JDR61vdhM4DDsPdvPjf7CD6UsYjHXTXP73MW4edMs3ITsKii6nlnR_L38ic9kGgBMAhxCEChfnFzpRAlCWTD4jtz0ryL7IsRzyUr8KZsdg7TJ02S0gZPo2B34YdmYiffOD_rL_8KRDuW5hN-cqoGiZWQ476qGuXXX4HQ9X0BlA2MvhS3IARZUH7G9UZLkHuLp-09yC0sliNc_mwUIWoCu4GSmlEMT7GmSdFdJfpm0JoDE9z3PHx35FSVYXAmMOHTuSGGUqB7Yw70op6664Oo5Ka4D3CNVLw3T7QL9B4tTyab6jRXaCbp9XGFZHAWkj7GxSH9KdSCczNeHe2I2kzXzDOkhXvxSTtd2eZxMLr5CU-OL4axuLcI5baGgT3oBHNBzdWlDQ1OWwErauVJ6u2QqeowIkIQVnogg9EWEK8RHNIOEDvtnGNyGYOzTwKsu7ZvD50Oa-Cux3efdUv0yEf6QeFPHYI-3uMZkIJzrazrm7s_6mlT5T1DNTCVHu9tAqWhyv5abGRBzGtaXmbXLXANvPwlYIETbCfTGz-IEVfosVW0UfbX1UUllUFayb_LYmYB7InoG1X6A-zOKLJMkIQb4_o2ynJlE"

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

    //let token = localStorage.getItem('token');

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
                navigate(`https://college-api.vercel.app/api/courses/${id}`);
            })
            .catch(err => {
                console.error(err);
            })
        }   
    }

    if(!festival) return <h4>Festival not found</h4>

    return (
        <>
            <h2>Edit festival</h2>

            <form onSubmit={submitForm}>
                <div>Title: <input type="text" onChange={handleForm} value={form.title} name='title'/><span style={errorStyle}>{errors.title?.message}</span></div>
                
                <div>Description: <input type="text" onChange={handleForm} value={form.description} name='description' /><span style={errorStyle}>{errors.description?.message}</span></div>
                
                <div>City: <input type="text" 
                onChange={handleForm} 
                value={form.city} 
                name='city' />
                <span style={errorStyle}>{errors.city?.message}</span>
                </div>
                
                <div>Start date: <input type="datetime-local" onChange={handleForm} value={form.start_date} name='start_date' /></div>
                <div>End date: <input type="datetime-local" onChange={handleForm} value={form.end_date} name='end_date' /></div>
                <input type="submit"/>
            </form>
        </>
    );
}

export default Edit;