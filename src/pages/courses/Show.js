import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// components
import DeleteBtn from "../../components/DeleteBtn";

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
                console.log("hello", response.data.data)
            })
                .catch(err => {
                    console.error(err);
            })
    }, [id])

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

    if(!courses) return <h4>Course not found</h4>

    return (
        <div className="flex items-center justify-center bg-slate-100 py-10">
            <div className="card w-[64rem] bg-white shadow-xl text-black">
                <div className="card-body">
                    <h1 className="card-title mb-2 text-4xl">{courses.title}</h1>
                    <hr/>

                    <label className="text-gray-400">Description</label>
                    <p className="mb-2 text-lg">{courses.description}</p>
                    <hr/>

                    <label className="text-gray-400">Level</label>
                    <p className="mb-2 text-lg">{courses.level}</p>
                    <hr/>

                    <label className="text-gray-400">Code</label>
                    <p className="mb-2 text-lg">{courses.code}</p>
                    <hr/>

                    <label className="text-gray-400">Points</label>
                    <p className="mb-2 text-lg">{courses.points}</p>
                    <hr/>

                    <label className="text-gray-400">Lecturer</label>
                        {courses.enrolments.length > 0 && courses.enrolments[0].lecturer ? (
                            <p className="mb-2 text-lg">{courses.enrolments[0].lecturer.name}</p>
                        ) : (
                            <p className="mb-2 text-lg">No lecturer assigned</p>
                        )}

                    <div className="card-actions justify-end p-2 mt-4">
                        <Link className="btn btn-outline btn-primary mt-0 pt-0" to={`/courses/${courses.id}/edit`}>Edit</Link>
                    
                        {/* <div className="btn btn-outline btn-error">
                            <DeleteBtn resource="courses" anotherResource="enrolments" id={courses.id} deleteCallBack={removeCourse} data={courses}/>
                        </div> */}
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default Show;