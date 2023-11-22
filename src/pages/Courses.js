import { useEffect, useState } from "react";
import axios from 'axios';

const Courses = () => {
    const [coursesList, setCoursesList] = useState([]);

    useEffect(() => {
        axios.get('https://college-api.vercel.app/api/courses')
        .then(response => {
            console.log("courses")
            console.log(response.data);
            setCoursesList(response.data);

        })
        .catch(error => {
            console.error(error);
        });

    }, []);

    return (
        <h1>hello from courses</h1>
    );

}

export default Courses;