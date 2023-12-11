import { Link } from "react-router-dom";

const HomeList = () => {
    return (
        <>
            <div className="flex justify-center gap-2">
<ul className="menu bg-base-200 w-56 rounded-box">
    <header className="text-center font-bold text-lg">Courses</header>
    <li><Link to='/courses'>View all courses</Link></li>
    <li><Link to='/courses/create'>Create a course</Link></li>
</ul>

<ul className="menu bg-base-200 w-56 rounded-box">
<header className="text-center font-bold text-lg">Lecturers</header>
    <li><Link to='/lecturers'>View all lecturers</Link></li>
    <li><Link to='/lecturers/create'>Create a leacturer</Link></li>
</ul>

<ul className="menu bg-base-200 w-56 rounded-box">
<header className="text-center font-bold text-lg">Enrolments</header>
    <li><Link to='/enrolments'>View all enrolments</Link></li>
    <li><Link to='/enrolments/create'>Create an enrolment</Link></li>
</ul>
</div>
        </>
    )
}

export default HomeList;