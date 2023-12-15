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

<div className="collapse bg-white">
                        <input type="checkbox" /> 
                        <label className="collapse-title text-gray-400 flex items-center">
                            Show lectures assigned to this course

                            {/* icon */}
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ms-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </span>
                        </label>
                        
                        <div className="collapse-content"> 
                        {courses.enrolments.length > 0 ? (
                            <ul className="mb-2 text-lg">
                                {courses.enrolments.map(enrollment => (
                                    <Link to={`/lecturers/${enrollment.lecturer.id}`}>
                                        <li className=" hover:text-blue-500 text-blue-400 hover:underline" key={enrollment.id}>{enrollment.lecturer.name}</li></Link>
                                ))}
                            </ul>
                        ) : (
                            <p className="mb-2 text-lg">No lecturers assigned</p>
                        )}
                        </div>
                    </div>

                    <div className="flex flex-row justify-between ">  
                    
                    <div className="card-actions p-2 mt-4">
                        <Link className="btn btn-outline btn-primary mt-0 pt-0" to="/courses">Back</Link>
                    </div>

                        <div className="card-actions p-2 mt-4">
                            <Link className="btn btn-outline btn-primary mt-0 pt-0" to={`/courses/${courses.id}/edit`}>Edit</Link>

                            <div className="btn btn-outline btn-error">
                            <button onClick={()=>document.getElementById(`my_modal_${courses.id}`).showModal()}>Delete</button>
                            <dialog id={`my_modal_${courses.id}`} className="modal">
                                <div className="modal-box bg-white">
                                <h3 className="font-bold text-lg">Delete course? {courses.id}</h3>
                                <p className="py-4">Deleted courses cannot be restored</p>
                                <div className="modal-action">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn btn-outline btn-primary me-2">Cancel</button>
                                        <div className="btn btn-outline btn-error">
                                            <Link to='/courses'>
                                                <DeleteBtn resource="courses" anotherResource="enrolments" id={courses.id} deleteCallBack={removeCourse} data={courses}/></Link>                            
                                        </div>
                                    </form>
                                </div>
                                </div>
                            </dialog> 
                            </div> 
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default Show;