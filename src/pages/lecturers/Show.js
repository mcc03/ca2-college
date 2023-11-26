import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Show = () => {

    let token = localStorage.getItem('token');

    // takes id from url
    const { id } = useParams();
    const [lecturers, setLecturers] = useState(null);

    const navigate = useNavigate();

    //let token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`https://college-api.vercel.app/api/lecturers/${id}`, {
            // important
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setLecturers(response.data.data)
                console.log(response.data.data)
            })
                .catch(err => {
                    console.error(err);
            })
    }, [id])

    if(!lecturers) return <h4>Lecturer not found</h4>

    return (
        <>
            <div className="ms-2">
                <p><b>Name :</b> {lecturers.name}</p>
                <p><b>Address :</b> {lecturers.address}</p>
                <b><p>Email: {lecturers.email}</p></b>
                <b><p>Phone: {lecturers.phone}</p></b>
                
                <b><p>Enrolments:</p></b>
                {lecturers.enrolments.length > 0 ? (
                    <ul>
                        {lecturers.enrolments.map(enrollment => (
                            <li key={enrollment.id}>{enrollment.course.title}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No enrolments</p>
                )}
                
            </div>
        </>
    )
}

export default Show;