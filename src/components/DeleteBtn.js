import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


//creates and exports
const DeleteBtn = ({id, resource, anotherResource, deleteCallBack, data}) => {
    let [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onDelete = () => {

        isLoading = true;
        let token = localStorage.getItem('token');

        console.log("id: ", id);
        console.log("resource: ", resource);
        console.log("anotherResource: ", data[anotherResource]);

        let listOfDeleteRequests = [];

        if (data[anotherResource]) {

            listOfDeleteRequests = data[anotherResource].map((current, index) =>
                axios.delete(`https://college-api.vercel.app/api/${anotherResource}/${current.id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                )
            );

            // log the contents of listOfDeleteRequests
        axios.all(listOfDeleteRequests)
        .then((response) => {
            axios.delete(`https://college-api.vercel.app/api/${resource}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((response) => {
                    //if anotherResource equals 0, delete resource
                    deleteCallBack(id);
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch(error => {
            console.error(error);
        });

        }
        else {
                        axios.delete(`https://college-api.vercel.app/api/${resource}/${id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                            .then(response => {
                                console.log(response.data);
                                deleteCallBack(id);
                                
                                // window.location.reload()
                            })
                            .catch(err => {
                                console.error(err.response.data);
                            })
        }

        
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

