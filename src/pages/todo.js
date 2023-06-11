import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Todo = () => {
    const [newTodo, setNewTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const token = localStorage.getItem("access_token");
    const navigate = useNavigate();

    const addTodo = () => {
        axios
            .post(
                "https://www.pre-onboarding-selection-task.shop/todos",
                { todo: newTodo },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((res) => {
                console.log(res);
                window.location.href = "/todo";
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        axios
            .get("https://www.pre-onboarding-selection-task.shop/todos", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setTodos(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <input
                data-testid="new-todo-input"
                onChange={(e) => {
                    setNewTodo(e.target.value);
                }}
            />
            <button data-testid="new-todo-add-button" onClick={addTodo}>
                추가
            </button>
            <ul>
                {todos.map((todo) => {
                    return (
                        <div key={todo.id}>
                            <li >{todo.todo}</li>
                            <button>수정</button>
                            <button>삭제</button>
                        </div>
                    );
                })}
            </ul>
        </div>
    );
};

export default Todo;
