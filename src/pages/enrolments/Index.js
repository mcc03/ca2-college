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

    const enrolmentsList = enrolments.map((enrolments, index) => {
        const colors = [  
            'outline-yellow-200',
            'outline-yellow-300',
            'outline-yellow-400',
            'outline-yellow-500',
    ];
        const selectedColor = colors[index % colors.length];

        return (
            <div key={enrolments.id} className={`card bg-white shadow-xl text-black min-w-[20%] outline outline-2 ${selectedColor}`}>
                <div className="card-body m-0 pb-0">
                    <h2 className="card-title">{enrolments.course.title}</h2>
                    <p>Lecturer: {enrolments.lecturer.name}</p>
                    <p>Code: {enrolments.course.code}</p>
                </div>

                <div className="card-actions justify-end p-2">
                <Link className="btn btn-xs btn-outline btn-primary mt-0 pt-0" to={`/enrolments/${enrolments.id}`}>View</Link>
                    <div className="btn btn-xs btn-outline btn-error">
                        <DeleteBtn resource="enrolments" id={enrolments.id} deleteCallBack={removeEnrolment} data={enrolments}/>
                    </div>
                </div> 
            </div>
        )
    });

    return (
        <div className="bg-slate-100 py-10">        
            <div className="flex justify-center gap-2 items-baseline mb-5">      
                <h1 className="text-center text-black text-4xl">Enrolments</h1>
                <Link to='create' className="btn btn-sm btn-circle btn-warning">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </Link>
            </div>  


            <div className="flex flex-wrap gap-4 justify-center">
                {enrolmentsList}
            </div>
        </div>

    );

}

export default Index;