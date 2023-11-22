import LoginForm from "../components/LoginForm";

const Home = ({ authenticated, onAuthenticated }) => {
    return (
        <>
            <h2>This is home</h2>
            {(!authenticated) ? (
                <LoginForm authenticated={authenticated} onAuthenticated={onAuthenticated} />
            ) : (<p>You are authenticated</p>)}
        </>
    );
}

export default Home;