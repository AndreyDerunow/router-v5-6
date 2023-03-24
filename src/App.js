import { Link, Switch, Route, useParams, Redirect } from "react-router-dom";
import "./App.css";

const NavBar = () => {
    return (
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/users">Users</Link>
            </li>
        </ul>
    );
};
const Main = () => {
    return <h1>Main</h1>;
};

const Users = () => {
    const { userId, action } = useParams();
    return !userId ? (
        <UsersList />
    ) : action === "profile" ? (
        <UserPage />
    ) : (
        <ProtectedRoute userId={userId} action={action} />
    );
};

const ProtectedRoute = ({ userId, action }) => {
    return (
        <Route
            render={() => {
                if (!action) {
                    return (
                        <Redirect
                            to={{ pathname: `/users/${userId}/profile` }}
                            state={{ userId }}
                        />
                    );
                }
                if (action !== "edit") {
                    return <Redirect to={{ pathname: `/users/${userId}` }} />;
                }

                return <EditUserPage userId={userId} />;
            }}
        />
    );
};

const UsersList = () => {
    const users = [1, 2, 3, 4, 5];
    return (
        <>
            <h1>Users list</h1>
            <ul>
                {users.map((u) => (
                    <li key={u}>
                        <Link to={`/users/${u}`}>{"User " + u}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

const UserPage = ({ userId }) => {
    const params = useParams();
    if (!userId) {
        userId = params.userId;
    }
    return (
        <>
            <h1>{"User page #" + userId}</h1>
            <ul style={{ listStyle: "none" }}>
                <li>
                    <Link to={`/users/${userId}/edit`}>Edit user..</Link>
                </li>
                <li>
                    <Link to="/users">Users page</Link>
                </li>
            </ul>
        </>
    );
};

const EditUserPage = ({ userId }) => {
    return (
        <>
            <h1>{"Edit user #" + userId}</h1>
            <ul style={{ listStyle: "none" }}>
                <li>
                    <Link to={`/users/${userId}`}>{"User #" + userId}</Link>
                </li>
                <li>
                    <Link to={`/users/${+userId + 1}`}>Next user</Link>
                </li>
                <li>
                    <Link to="/users">Users page</Link>
                </li>
            </ul>
        </>
    );
};

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/users/:userId?/:action?" component={Users} />
                <Route path="/" exact component={Main} />
                <Redirect to="/" />
            </Switch>
        </>
    );
}

export default App;
