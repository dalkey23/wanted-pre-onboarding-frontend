import {  BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Signup from './sign/signup';
import Signin from './sign/signin';

function App() {
    return (
        <>
            <h1>Main</h1>
            <BrowserRouter>
              <ul>
                <Link to='/signup'>
                  <li>signup</li>
                </Link>
                <Link to ='/signin'>
                  <li>signin</li>
                </Link>
                <li>todo-list</li>
              </ul>
              <hr />
              <Routes>
                <Route path='/signup' element={<Signup />}/>
                <Route path='/signin' element={<Signin />}/>
              </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
