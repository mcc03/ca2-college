import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import DeleteBtn from "../../components/DeleteBtn";

const Index = () => {
    let token = localStorage.getItem('token');

    const [enrolments, setEnrolments] = useState([]);

    useEffect(() => {
        axios.get('https://college-api.vercel.app/api/enrolments', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log("enrolments")
            console.log(response.data.data);
            setEnrolments(response.data.data);

        })
        .catch(error => {
            console.error(error);
        });

    }, []);

    const removeEnrolment = (id) => {
        console.log("Deleted: ", id)

        //looping through all enrolemts, adding enrolemt to list that doesnt have the id
        let updatedEnrolments = enrolments.filter((enrolment) => {
            return enrolment.id !== id;
        })

        setEnrolments(updatedEnrolments);
    };

    if(enrolments.length === 0) return <h3>There are no enrolments</h3>;

    const enrolmentsList = enrolments.map(enrolments => {
        return (
            <div className="ms-2" key={enrolments._id}>

                <Link to={`/enrolments/${enrolments.id}`}><p><b>Enrolment Title :</b> {enrolments.course.title}<span className='text-blue-500'>(ID: {enrolments.course_id})</span></p></Link>
                <b><p>Enrolment Code: {enrolments.course.code}</p></b>
                <p><b>Obj ID :</b> {enrolments.id}</p>
                <p><b>Course ID :</b> {enrolments.course_id}</p>
                <p><b>Lecturer Name :</b> {enrolments.lecturer.name}  <span className='text-blue-500'>(ID: {enrolments.lecturer_id})</span></p>

                <DeleteBtn resource="enrolments" id={enrolments.id} deleteCallBack={removeEnrolment} data={enrolments}/>

                <hr/>
            </div>
        )
    });

    return (
        <>        
            <h1 className="mb-5">hello from enrolments</h1>
            {enrolmentsList}
        </>

    );

}

export default Index;