import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// components
import DeleteBtn from "../../components/DeleteBtn";

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
                console.log("hello", response.data.data)
            })
                .catch(err => {
                    console.error(err);
            })
    }, [id])

    const removeLecture = (id) => {
        console.log("Deleted: ", id)

        //looping through all courses, adding course to list that doesnt have the id
        let updatedLecturers = lecturers.filter((lecture) => {
            return lecture.id !== id;
        })

        setLecturers(updatedLecturers);
    };

    if(!lecturers) return <h4>Lecturer not found</h4>

    return (
<div className="flex items-center justify-center bg-slate-100 py-10">
            <div className="card w-[64rem] bg-white shadow-xl text-black">
                <div className="card-body">
                <h1 className="card-title mb-2 text-4xl items-center">
                    {lecturers.name} 
                    {lecturers.enrolments[0]?.status ? (
                        <span className="badge badge-outline ms-2">{lecturers.enrolments[0].status}</span>
                    ) : (
                        <span className="badge badge-outline ms-2">No status</span>
                    )}
                </h1>
                <hr/>

                    <label className="text-gray-400">Enrolments</label>
                        {lecturers.enrolments.length > 0 ? (
                            <ul className="mb-2 text-lg">
                                {lecturers.enrolments.map(enrollment => (
                                    <li key={enrollment.id}>{enrollment.course.title}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="mb-2 text-lg">No enrolments</p>
                        )}
                    <hr/>

                    <label className="text-gray-400">Email</label>
                    <p className="mb-2 text-lg">{lecturers.email}</p>
                    <hr/>

                    <label className="text-gray-400">Phone number</label>
                    <p className="mb-2 text-lg">{lecturers.phone}</p>
                    <hr/>

                    <label className="text-gray-400">Address</label>
                    <p className="mb-2 text-lg">{lecturers.address}</p>
                    <hr/>

                    <div className="flex">
                    <div className="card-actions justify-start p-2 mt-4">
                        <Link className="btn btn-outline btn-primary mt-0 pt-0" to={`/lecturers/${lecturers.id}/edit`}>Edit</Link>
                            <div className="btn btn-outline btn-error">
                            <button onClick={()=>document.getElementById(`my_modal_${lecturers.id}`).showModal()}>Delete</button>
                        <dialog id={`my_modal_${lecturers.id}`} className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Delete lecturer? {lecturers.id}</h3>
                            <p className="py-4">Deleted lecturers cannot be restored</p>
                            <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-outline btn-primary me-2">Cancel</button>
                            <div className="btn btn-outline btn-error">
                                <Link to='/lecturers'><DeleteBtn resource="lecturers" anotherResource="enrolments" id={lecturers.id} deleteCallBack={removeLecture} data={lecturers}/>
                                </Link>
                            </div>
                            </form>
                            </div>
                        </div>
                        </dialog>
                            </div>
                    </div> 

                        <div className="card-actions justify-end p-2 mt-4">
                        <Link className="btn btn-outline btn-primary mt-0 pt-0" to={`/lecturers/${lecturers.id - 1}`}>Previous</Link>
                        <Link className="btn btn-outline btn-primary mt-0 pt-0" to={`/lecturers/${lecturers.id + 1}`}>Next</Link>
                        </div>
                    </div>
                
                </div>
            </div>
        </div>
    )
}

export default Show;