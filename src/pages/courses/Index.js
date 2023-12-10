import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import DeleteBtn from "../../components/DeleteBtn";

const Index = () => {
    let token = localStorage.getItem('token');

    const [courses, setCourses] = useState([]);

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

    const removeCourse = (id) => {
        console.log("Deleted: ", id)

        //looping through all courses, adding course to list that doesnt have the id
        let updatedCourses = courses.filter((course) => {
            return course._id !== id;
        })

        setCourses(updatedCourses);
    };

    if(courses.length === 0) return <h3>There are no courses</h3>;

    const coursesList = courses.map(courses => {
        return (
            <div key={courses._id}>

                <p><b>Title:</b> 
                <Link to={`/courses/${courses.id}`}> {courses.title}</Link></p>

                <p><b>Level :</b> {courses.level}</p>
                <p><b>Code :</b> {courses.code}</p>
                <b><p>Points :  <span className='text-blue-500'>{courses.points}</span></p></b>

                <DeleteBtn resource="courses" anotherResource="enrolments" id={courses.id} deleteCallBack={removeCourse} data={courses}/>

                <hr/>
            </div>
        )
    });

    return (
        <>        
            <h1 className="mb-5">hello from courses</h1>
            {coursesList}
        </>

    );

}

export default Index;