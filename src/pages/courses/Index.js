import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const Index = () => {
    let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOTBiNmRiZDQ3OWI5N2RmNmJkNzQxMmVjYThkMmI4N2JlNzczMjFmMTkwMTJlOGU1YTlmMzVhMDU3Mzg1OGQyMmQ4MTVjODFkZDhkMTQ4NjAiLCJpYXQiOiIxNzAwNzM0NjQwLjk0MDM0NSIsIm5iZiI6IjE3MDA3MzQ2NDAuOTQwMzQ4IiwiZXhwIjoiMTczMjM1NzA0MC45Mjg5ODkiLCJzdWIiOiIxNSIsInNjb3BlcyI6W119.mpBE_T4_irjKSRjGRz0goK0sxHPIheKKNFPFUmdiauZKGV2dGZHdvNIo3h0aB_ok8aTPhk7JXw2Pw5JDR61vdhM4DDsPdvPjf7CD6UsYjHXTXP73MW4edMs3ITsKii6nlnR_L38ic9kGgBMAhxCEChfnFzpRAlCWTD4jtz0ryL7IsRzyUr8KZsdg7TJ02S0gZPo2B34YdmYiffOD_rL_8KRDuW5hN-cqoGiZWQ476qGuXXX4HQ9X0BlA2MvhS3IARZUH7G9UZLkHuLp-09yC0sliNc_mwUIWoCu4GSmlEMT7GmSdFdJfpm0JoDE9z3PHx35FSVYXAmMOHTuSGGUqB7Yw70op6664Oo5Ka4D3CNVLw3T7QL9B4tTyab6jRXaCbp9XGFZHAWkj7GxSH9KdSCczNeHe2I2kzXzDOkhXvxSTtd2eZxMLr5CU-OL4axuLcI5baGgT3oBHNBzdWlDQ1OWwErauVJ6u2QqeowIkIQVnogg9EWEK8RHNIOEDvtnGNyGYOzTwKsu7ZvD50Oa-Cux3efdUv0yEf6QeFPHYI-3uMZkIJzrazrm7s_6mlT5T1DNTCVHu9tAqWhyv5abGRBzGtaXmbXLXANvPwlYIETbCfTGz-IEVfosVW0UfbX1UUllUFayb_LYmYB7InoG1X6A-zOKLJMkIQb4_o2ynJlE"

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

    if(courses.length === 0) return <h3>There are no courses</h3>;

    const coursesList = courses.map(courses => {
        return (
            <div key={courses.id}>

                <p><b>Title:</b> 
                <Link to={`/courses/${courses.id}`}>{courses.title}</Link></p>
                
                <p><b>Level :</b> {courses.level}</p>
                <p><b>Code :</b> {courses.code}</p>
                <p><b>Points :</b> {courses.points}</p>

                <hr/>
            </div>
        )
    });

    return (
        <>        
            <h1 className="mb-5">hello from courses</h1>
            {coursesList}
        </>

    );

}

export default Index;