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
            console.log(course);
            return course.id !== id;
        })

        console.log(updatedCourses);

        setCourses(updatedCourses);
    };

    if(courses.length === 0) return <h3>There are no courses</h3>;

    const coursesList = courses.map((courses, index) => {
        // const colorStart = 100;
        // const colorShift = colorStart * index
        const colors = [  
            'outline-blue-200',
            'outline-blue-300',
            'outline-blue-400',
            'outline-blue-500',
    ];
        const selectedColor = colors[index % colors.length];
        

        return (

            <div key={courses.id} className={`card bg-white shadow-xl text-black min-w-[20%] outline outline-2 ${selectedColor}`}>
                <div className="card-body m-0 pb-0">
                    <h2 className="card-title">{courses.title}</h2>
                    <p>Level: {courses.level}</p>
                    <p>Points: {courses.points}</p>
                </div>

                <div className="card-actions justify-end p-2">
                <Link className="btn btn-xs btn-outline btn-primary mt-0 pt-0" to={`/courses/${courses.id}`}>View</Link>
                    <div className="btn btn-xs btn-outline btn-error">
                        <DeleteBtn resource="courses" anotherResource="enrolments" id={courses.id} deleteCallBack={removeCourse} data={courses}/>
                    </div>
                </div> 
            </div>
        )
    });

    return (
        <div className="bg-slate-100 py-10">

            <div className="flex justify-center gap-2 items-baseline mb-5">      
            <h1 className="text-center text-black text-4xl">Courses</h1>
            <Link to='create' className="btn btn-sm btn-circle btn-success">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </Link>
            </div>  


            <div key={courses._id} className="flex flex-wrap gap-4 justify-center">
                {coursesList}
            </div>
        </div>

    );

}

export default Index;