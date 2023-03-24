import "./App.css";
import {
    Link,
    Navigate,
    useRoutes,
    useParams,
    Outlet,
    useLocation
    // useLocation
} from "react-router-dom";

const NavBar = () => {
    return (
        <ul style={{ listStyle: "none" }}>
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

const UsersLayout = () => {
    return (
        <>
            <Outlet />
        </>
    );
};

const UsersList = () => {
    const users = [1, 2, 3, 4, 5];
    return (
        <>
            <h1>Users list</h1>
            <ul style={{ listStyle: "none" }}>
                {users.map((u) => (
                    <li key={u}>
                        <Link to={`${u}`}>{"User " + u}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
};
const UserLayout = () => {
    return (
        <>
            <Outlet />
        </>
    );
};
const UserPage = () => {
    const para = useParams();
    const { userId, action } = para;
    const location = useLocation();
    if (action !== "profile" && !location.state) {
        return (
            <Navigate
                to={`/users/${userId}/profile`}
                state={{ action: "profile" }}
            />
        );
    }
    return (
        <>
            <h1>{"User page #" + userId}</h1>
            <ul style={{ listStyle: "none" }}>
                <li>
                    <Link to={`/users/${userId}/edit`}>
                        {"Edit user #" + userId}
                    </Link>
                </li>
                <li>
                    <Link to={`/users`}>Users list</Link>
                </li>
            </ul>
        </>
    );
};

const EditUserPage = () => {
    const para = useParams();
    const { userId, action } = para;
    if (action !== "edit") {
        return <Navigate to={`/users/${userId}/profile`} />;
    }
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
                    <Link to={`/users`}>Users list</Link>
                </li>
            </ul>
        </>
    );
};
const routes = () => [
    { path: "", element: <Main /> },
    {
        path: "users",
        element: <UsersLayout />,
        children: [
            { path: "", element: <UsersList /> },
            {
                path: ":userId",
                element: <UserLayout />,
                children: [
                    { path: "", element: <UserPage /> },
                    { path: "profile", element: <UserPage /> },
                    {
                        path: ":action",
                        element: <EditUserPage />
                    }
                ]
            }
        ]
    },
    { path: "*", element: <Navigate to="/" /> }
];
function App() {
    const elements = useRoutes(routes());
    return (
        <>
            <NavBar />
            {elements}
        </>
    );
}

export default App;
