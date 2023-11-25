import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Show = () => {

    let token = localStorage.getItem('token');

    // takes id from url
    const { id } = useParams();
    const [courses, setCourses] = useState(null);

    const navigate = useNavigate();

    //let token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`https://college-api.vercel.app/api/courses/${id}`, {
            // important
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setCourses(response.data.data)
                console.log(response.data.data)
            })
                .catch(err => {
                    console.error(err);
            })
    }, [id])

    if(!courses) return <h4>Festival not found</h4>

    return (
        <>
            <div>
                <p><b>Title :</b> {courses.title}</p>
                <p><b>Description:</b> {courses.description}</p>
                <p><b>Level :</b> {courses.level}</p>
                <p><b>Code :</b> {courses.code}</p>
                <b><p>Points :  <span className='text-blue-500'>{courses.points}</span></p></b>
            </div>
        </>
    )
}

export default Show;