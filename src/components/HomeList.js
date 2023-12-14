import { Link } from "react-router-dom";

const HomeList = () => {
    return (
    <div className="bg-slate-100 py-20 h-screen ">
        <div className="flex justify-center gap-4 text-center ">
            <ul className="menu rounded-box bg-white outline-double outline-blue-500 min-w-[20%]">
            <header className="text-4xl mb-2">Courses</header>
                <Link to='/courses' className="mb-1 hover:bg-blue-50">View all courses</Link>
                <Link to='/courses/create' className="mb-1 hover:bg-blue-50">Create a course</Link>
            </ul>

            <ul className="menu rounded-box bg-white outline-double outline-green-500 min-w-[20%]">
            <header className="text-4xl mb-2">Lecturers</header>
                <Link to='/lecturers' className="mb-1 hover:bg-green-50">View all lecturers</Link>
                <Link to='/lecturers/create' className="mb-1 hover:bg-green-50">Create a leacturer</Link>
            </ul>

            <ul className="menu rounded-box bg-white outline-double outline-yellow-500 min-w-[20%]">
            <header className="text-4xl mb-2">Enrolments</header>
                <Link to='/enrolments' className="mb-1 hover:bg-yellow-50">View all enrolments</Link>
                <Link to='/enrolments/create' className="mb-1 hover:bg-yellow-50">Create an enrolment</Link>
            </ul>
        </div>
    </div>
    )
}

export default HomeList;