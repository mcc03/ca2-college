import axios from "axios";
import { useState } from "react";
//import { useNavigate } from "react-router-dom";


//creates and exports
const DeleteBtn = () => {
    let [isLoading, setIsLoading] = useState(false);
    //const navigate = useNavigate();

    //pass in an id as a prop
    const onDelete = (id, resource, deleteCallBack) => {
        isLoading = true;
        let token = localStorage.getItem('token');

        axios.delete(`https://college-api.vercel.app/api/${resource}/${id}`, {
            headers: {
            Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data);
                deleteCallBack(id);
                //navigate('/festivals');
            })
            .catch(err => {
                console.error(err.response.data);
            })
    }
    return (
        <>
            <button onClick={onDelete} className='text-red-600'>
                {(isLoading) ? "Deleting..." : "Delete"}
            </button>
        </>
    );
}

export default DeleteBtn;
