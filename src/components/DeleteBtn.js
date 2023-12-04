import axios from "axios";
import { useState } from "react";
//import { useNavigate } from "react-router-dom";


//creates and exports
const DeleteBtn = ({id, resource, anotherResource, deleteCallBack, data}) => {
    let [isLoading, setIsLoading] = useState(false);
    //const navigate = useNavigate();

    // const [course, setCourse] = useState([]);

    //pass in an id as a prop
    const onDelete = () => {

        isLoading = true;
        let token = localStorage.getItem('token');

        console.log(id);
        console.log(data[anotherResource]);
            
        let listOfDeleteRequests = data[anotherResource].map((current, index)=>
        axios.delete(`https://college-api.vercel.app/api/${anotherResource}/${current.id}`, 
            {headers: { Authorization: `Bearer ${token}` }}
        ));
            // log the contents of listOfDeleteRequests
            axios.all(listOfDeleteRequests) //this line deletes all enrolments first and then runs the then() method below
                .then((response) => {

                    axios.delete(`https://college-api.vercel.app/api/${resource}/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
            })
                .then((response) => {
                //do something
                if (data[anotherResource].length <= 0) {
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
            })
                .catch((error) => {
                    console.log(error);
            });

        });
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

