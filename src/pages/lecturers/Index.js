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

        //looping through all courses, adding course to list that doesnt have the id
        let updatedLecturers = lecturers.filter((lecture) => {
            return lecture.id !== id;
        })

        setLecturers(updatedLecturers);
    };

    if(lecturers.length === 0) return <h3>There are no lecturers</h3>;

    const lecturersList = lecturers.map((lecturers, index) => {

        const colors = [  
            'outline-green-200',
            'outline-green-300',
            'outline-green-400',
            'outline-green-500',
    ];
        const selectedColor = colors[index % colors.length];

        return (
            <div key={lecturers.id} className={`card bg-white shadow-xl text-black outline outline-2 ${selectedColor}`}>
                <div className="card-body m-0 pb-0">
                    <h2 className="card-title">{lecturers.name}</h2>
                    <p className="truncate max-w-[16rem]">Address: {lecturers.address}</p>
                    <p>Phone: {lecturers.phone}</p>
                    <p className="truncate max-w-[16rem]">Email: {lecturers.email}</p>
                </div>

                <div className="card-actions justify-end p-2">
                <Link className="btn btn-xs btn-outline btn-primary mt-0 pt-0" to={`/lecturers/${lecturers.id}`}>View</Link>
                    <div className="btn btn-xs btn-outline btn-error">
                    <button onClick={()=>document.getElementById(`my_modal_${lecturers.id}`).showModal()}>Delete</button>
                        <dialog id={`my_modal_${lecturers.id}`} className="modal">
                        <div className="modal-box bg-white">
                            <h3 className="font-bold text-lg">Delete lecturer? {lecturers.id}</h3>
                            <p className="py-4">Deleted lecturers cannot be restored</p>
                            <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-outline btn-primary me-2">Cancel</button>
                            <div className="btn btn-outline btn-error">
                                <DeleteBtn resource="lecturers" anotherResource="enrolments" id={lecturers.id} deleteCallBack={removeLecture} data={lecturers}/>
                            </div>
                            </form>
                            </div>
                        </div>
                        </dialog>
                    </div>
                </div> 
            </div>
        )
    });

    return (
        <div className="bg-slate-100 py-10">        
            <div className="flex justify-center gap-2 items-baseline mb-5">      
                <h1 className="text-center text-black text-4xl mb-5">Lecturers</h1>
                <Link to='create' className="btn btn-sm btn-circle btn-success">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </Link>
            </div>  


            <div key={lecturers._id} className="flex flex-wrap justify-center">
                <div className="grid grid-cols-4 gap-4">
                    {lecturersList}
                </div>
            </div>
        </div>

    );

}

export default Index;