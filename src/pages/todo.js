import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditMode = ({ todo, updateTodo }) => {
    const clicksubmitButton = () => {
        updateTodo();
    };

    return (
        <li key={todo.id}>
            <input type="checkbox" />
            <input defaultValue={todo.todo} />
            <button data-testid="submit-button" onClick={clicksubmitButton}>
                제출
            </button>
            <button data-testid="cancel-button">취소</button>
        </li>
    );
};

const NormalMode = ({ todo, changeEditMode, deleteTodo }) => {
    const clickModifyButton = () => {
        changeEditMode(todo.id);
    };

    const clickDeleteButton = () => {
        deleteTodo(todo.id);
    };

    return (
        <li key={todo.id}>
            <input type="checkbox" />
            <span>{todo.todo}</span>
            <button data-testid="modify-button" onClick={clickModifyButton}>
                수정
            </button>
            <button data-testid="delete-button" onClick={clickDeleteButton}>
                삭제
            </button>
        </li>
    );
};

const TodoList = () => {
    const [newTodo, setNewTodo] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [editedTodo, setEditedTodo] = useState(-1);
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

    const updateTodo = () => {
        console.log("updateTodo");
    };

    const deleteTodo = (id) => {
        console.log(`id: ${id}`);
        axios
            .delete(
                `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then(() => {
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
                setTodoList(res.data);
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
                {todoList.map((todo) => {
                    if (todo.id === editedTodo) {
                        return (
                            <EditMode
                                todo={todo}
                                key={todo.id}
                                updateTodo={updateTodo}
                            />
                        );
                    } else {
                        return (
                            <NormalMode
                                todo={todo}
                                key={todo.id}
                                changeEditMode={(id) => {
                                    setEditedTodo(id);
                                }}
                                deleteTodo={deleteTodo}
                            />
                        );
                    }
                })}
            </ul>
        </div>
    );
};

export default TodoList;
