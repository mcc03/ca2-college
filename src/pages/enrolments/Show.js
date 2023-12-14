import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// components
import DeleteBtn from "../../components/DeleteBtn";

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

    const removeEnrolment = (id) => {
        console.log("Deleted: ", id)

        //looping through all enrolemts, adding enrolemt to list that doesnt have the id
        let updatedEnrolments = enrolments.filter((enrolment) => {
            return enrolment.id !== id;
        })

        setEnrolments(updatedEnrolments);
    };

    if(!enrolments) return <h4>Enrolment not found</h4>

    return (

<div className="flex items-center justify-center bg-slate-100 py-10">
            <div className="card w-[64rem] bg-white shadow-xl text-black">
                <div className="card-body">
                    <h1 className="card-title mb-2 text-4xl">{enrolments.course.title}</h1>
                    <hr/>

                    <label className="text-gray-400">Lecturer</label>
                    <p className="card-title mb-2 text-lg">{enrolments.lecturer.name}</p>
                    <hr/>

                    <label className="text-gray-400">Course description</label>
                    <p className="mb-2 text-lg">{enrolments.course.description}</p>
                    <hr/>

                    <label className="text-gray-400">Course code</label>
                    <p className="mb-2 text-lg">{enrolments.course.code}</p>
                    <hr/>

                    <label className="text-gray-400">Enrolment status</label>
                    <p className="mb-2 text-lg capitalize">{enrolments.status}</p>
                    <hr/>

                    <div className="collapse bg-white">
                        <input type="checkbox" /> 
                        <label className="collapse-title text-gray-400 flex items-center">
                            Additional information

                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ms-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </span>
                        </label>
                        
                        <div className="collapse-content"> 
                            <p><b>Obj ID :</b> {enrolments.id}</p>
                            <p><b>Course ID :</b> {enrolments.course_id}</p>
                            <p><b>Lecturer ID :</b> {enrolments.lecturer_id}</p>
                            <p><b>Created at :</b> {enrolments.created_at}</p>
                        </div>
                    </div>

                    <div className="flex">
                    <div className="card-actions justify-start p-2 mt-4">
                        <Link className="btn btn-outline btn-primary mt-0 pt-0" to={`/enrolments/${enrolments.id}/edit`}>Edit</Link>

                        <div className="btn btn-outline btn-error">
                        <button onClick={()=>document.getElementById(`my_modal_${enrolments.id}`).showModal()}>Delete</button>
                        <dialog id={`my_modal_${enrolments.id}`} className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Delete enrolment? {enrolments.id}</h3>
                            <p className="py-4">Deleted enrolments cannot be restored</p>
                            <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-outline btn-primary me-2">Cancel</button>
                            <div className="btn btn-outline btn-error">
                                <Link to='/enrolments'><DeleteBtn resource="enrolments" anotherResource="enrolments" id={enrolments.id} deleteCallBack={removeEnrolment} data={enrolments}/>
                                </Link>
                            </div>
                            </form>
                            </div>
                        </div>
                        </dialog>
                        </div>
                    </div> 

                        <div className="card-actions justify-end p-2 mt-4">
                        <Link className="btn btn-outline btn-primary mt-0 pt-0" to={`/enrolments/${enrolments.id - 1}`}>Previous</Link>
                        <Link className="btn btn-outline btn-primary mt-0 pt-0" to={`/enrolments/${enrolments.id + 1}`}>Next</Link>
                        </div>
                    </div>


                </div>
 
            </div>
            
                        {/* <div className="ms-2" key={enrolments._id}>
                <p><b>Obj ID :</b> {enrolments.id}</p>
                <p><b>Course ID :</b> {enrolments.course_id}</p>
                <p><b>Lecturer Name :</b> {enrolments.lecturer.name}  <span className='text-blue-500'>(ID: {enrolments.lecturer_id})</span></p>
                <p><b>Enrolment Title :</b> {enrolments.course.title}  <span className='text-blue-500'>(ID: {enrolments.course_id})</span></p>
                <p><b>Enrolment Code: </b>{enrolments.course.code}</p>
                <p><b>Description: </b>{enrolments.course.description}</p>
                <p><b>Status: </b>{enrolments.status}</p> 

            </div> */}
        </div>



        
    )
}

export default Show;