import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import DeleteBtn from "../../components/DeleteBtn";

const Index = () => {
    let token = localStorage.getItem('token');

    const [lecturers, setLecturers] = useState([]);

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

    const removeLecture = (id) => {
        console.log("Deleted: ", id)

        //looping through all festivals, adding festival to list that doesnt have the id
        let updatedLecturers = lecturers.filter((lecture) => {
            return lecture._id !== id;
        })

        setLecturers(updatedLecturers);
    };

    if(lecturers.length === 0) return <h3>There are no lecturers</h3>;

    const lecturersList = lecturers.map(lecturers => {
        return (
            <div className="ms-2" key={lecturers._id}>

                <p><b>Name:</b> 
                <Link to={`/lecturers/${lecturers.id}`}> {lecturers.name}</Link></p>
                <p><b>Address :</b> {lecturers.address}</p>
                <b><p>Email: {lecturers.email}</p></b>
                <b><p>Phone: {lecturers.phone}</p></b>

                <DeleteBtn resource="lecturers" anotherResource="enrolments" id={lecturers.id} deleteCallBack={removeLecture} data={lecturers}/>

                <hr/>
            </div>
        )
    });

    return (
        <>        
            <h1 className="mb-5">hello from lecturers</h1>
            {lecturersList}
        </>

    );

}

export default Index;