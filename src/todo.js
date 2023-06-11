import axios from "axios";
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";


const Todo = () => {

    //const [newTodo, setNewTodo] = useState('');
    const navigate = useNavigate();


    // const addTodo = ()=>{

    //     axios.post('http://localhost:8000/todos', {newTodo})

    // }

    useEffect(() => {
        if (!localStorage.getItem("access_token")) {
            navigate("/signin");
        }
    }, []);


    return (
        <div>
            <input data-testid="new-todo-input" />
            {/* <button data-testid="new-todo-add-button" onClick={addTodo}>추가</button> */}
            <ul>
                <li>todos</li>
            </ul>
        </div>
    );
};

export default Todo;
