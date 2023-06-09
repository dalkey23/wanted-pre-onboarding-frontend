import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditMode = ({ todo, updateTodo, cancelTodo }) => {
    const [editedTodo, setEditTodo] = useState("");

    const clickSubmitButton = () => {
        updateTodo(todo.id, editedTodo, todo.isCompleted);
    };

    const clickCancelButton = () => {
        cancelTodo();
    };

    const clickCheckbox = () => {
        updateTodo(todo.id, todo.todo, !todo.isCompleted);
    };

    return (
        <li key={todo.id}>
            <label>
                <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={clickCheckbox}
                />
                <input
                    data-testid="modify-input"
                    defaultValue={todo.todo}
                    onChange={(e) => {
                        setEditTodo(e.target.value);
                    }}
                />
            </label>
            <button data-testid="submit-button" onClick={clickSubmitButton}>
                제출
            </button>
            <button data-testid="cancel-button" onClick={clickCancelButton}>
                취소
            </button>
        </li>
    );
};

const NormalMode = ({ todo, changeEditMode, deleteTodo, updateTodo }) => {
    const clickModifyButton = () => {
        changeEditMode(todo.id);
    };

    const clickDeleteButton = () => {
        deleteTodo(todo.id);
    };

    const clickCheckbox = () => {
        updateTodo(todo.id, todo.todo, !todo.isCompleted);
    };

    return (
        <li key={todo.id}>
            <label>
                <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={clickCheckbox}
                />
                <span>{todo.todo}</span>
            </label>
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
    const [editedTodoId, setEditedTodoId] = useState(-1);
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
                window.location.href = "/todo";
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const updateTodo = (id, editedTodo, isCompleted) => {
        axios
            .put(
                `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
                { todo: editedTodo, isCompleted },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((res) => {
                window.location.href = "/todo";
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteTodo = (id) => {
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
        const hasToken = localStorage.getItem("access_token");
        if (!hasToken) {
            navigate("/signin");
        } else {
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
        }
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
                    if (todo.id === editedTodoId) {
                        return (
                            <EditMode
                                todo={todo}
                                key={todo.id}
                                updateTodo={updateTodo}
                                cancelTodo={() => {
                                    setEditedTodoId(-1);
                                }}
                            />
                        );
                    } else {
                        return (
                            <NormalMode
                                todo={todo}
                                key={todo.id}
                                changeEditMode={(id) => {
                                    setEditedTodoId(id);
                                }}
                                deleteTodo={deleteTodo}
                                updateTodo={updateTodo}
                            />
                        );
                    }
                })}
            </ul>
        </div>
    );
};

export default TodoList;
