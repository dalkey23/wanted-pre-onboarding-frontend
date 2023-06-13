import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Signup from "./pages/signup";
import Signin from "./pages/signin";
import TodoList from "./pages/todo";
import Home from "./pages/home";

function App() {
    return (
        <>
            <a href="/">
              <h1>Main</h1>
            </a>
            <BrowserRouter>
                <ul>
                    <Link to="/signup">
                        <li>signup</li>
                    </Link>
                    <Link to="/signin">
                        <li>signin</li>
                    </Link>
                    <Link to="/todo">
                        <li>todo</li>
                    </Link>
                </ul>
                <hr />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/todo" element={<TodoList />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
