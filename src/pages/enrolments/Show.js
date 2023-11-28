import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Show = () => {

    let token = localStorage.getItem('token');

    // takes id from url
    const { id } = useParams();
    const [enrolments, setEnrolments] = useState(null);

    const navigate = useNavigate();

    //let token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`https://college-api.vercel.app/api/enrolments/${id}`, {
            // important
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setEnrolments(response.data.data)
                console.log(response.data.data)
            })
                .catch(err => {
                    console.error(err);
            })
    }, [id])

    if(!enrolments) return <h4>enrolment not found</h4>

    return (
        <>
            <div className="ms-2" key={enrolments._id}>
                <p><b>Obj ID :</b> {enrolments.id}</p>
                <p><b>Course ID :</b> {enrolments.course_id}</p>
                <p><b>Lecturer Name :</b> {enrolments.lecturer.name}  <span className='text-blue-500'>(ID: {enrolments.lecturer_id})</span></p>
                <p><b>Enrolment Title :</b> {enrolments.course.title}  <span className='text-blue-500'>(ID: {enrolments.course_id})</span></p>
                <p><b>Enrolment Code: </b>{enrolments.course.code}</p>
                <p><b>Description: </b>{enrolments.course.description}</p>
                <p><b>Status: </b>{enrolments.status}</p> 

            </div>
        </>
    )
}

export default Show;