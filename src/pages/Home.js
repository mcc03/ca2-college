import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

//components
import HomeList from "../components/HomeList";

const Home = ({ authenticated, onAuthenticated }) => {
    return (
        <div className="bg-slate-100">
            {/* <h2>This is home</h2> */}
            {(!authenticated) ? (
                <LoginForm authenticated={authenticated} onAuthenticated={onAuthenticated} />
            ) : (<HomeList/>)}

            

        </div>
    );
}

export default Home;