import React, { useState, useCallback, useRef, useEffect, memo } from "react";
import "./App.css";
const Control = memo(function Control(props) {
  let idSeq = Date.now();
  const { addTodo } = props;
  const inputRef = useRef();
  const onSubmit = e => {
    e.preventDefault();
    const newText = inputRef.current.value.trim();
    if (newText.length === 0) {
      return;
    }
    addTodo({
      id: ++idSeq,
      text: newText,
      complete: false
    });
    inputRef.current.value = "";
  };
  return (
    <div className="control">
      <h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          ref={inputRef}
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </div>
  );
});
const TodoItem = memo(function TodoItem(props) {
  const {
    todo: { id, text, complete },
    toggleTodo,
    removeTodo
  } = props;
  const onChange = () => {
    toggleTodo(id);
  };
  const onRemove = () => {
    removeTodo(id);
  };
  return (
    <li className="todo-item">
      <input type="checkbox" onChange={onChange} checked={complete} />
      <label className={complete ? "complete" : ""}>{text}</label>
      <button onClick={onRemove}>&#xd7;</button>
    </li>
  );
});
const Todos = memo(function Todos(props) {
  const { todos, toggleTodo, removeTodo } = props;
  return (
    <ul>
      {todos.map(todo => {
        // 需要使用单独的组件,防止单个组件修改,全部变更
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
          ></TodoItem>
        );
      })}
    </ul>
  );
});

const LS_KEY = "$-todos_";
function TodoList() {
  const [todos, setTodos] = useState([]);
  const addTodo = todo => {
    setTodos(todos => [...todos, todo]);
  };
  const removeTodo = useCallback(id => {
    // 传入todos减少对其依赖
    setTodos(todos =>
      todos.filter(todo => {
        return todo.id !== id;
      })
    );
    // 不依赖其他变量
  }, []);
  const toggleTodo = useCallback(id => {
    setTodos(todos =>
      todos.map(todo => {
        return todo.id === id
          ? {
              ...todo,
              complete: !todo.complete
            }
          : todo;
      })
    );
  }, []);

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(LS_KEY) || "{}");
    console.log(todos);
    setTodos(todos);
  }, []);
  useEffect(() => {
    console.log("33");
    localStorage.setItem(LS_KEY, JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todo-list">
      <Control addTodo={addTodo}></Control>
      <Todos
        removeTodo={removeTodo}
        toggleTodo={toggleTodo}
        todos={todos}
      ></Todos>
    </div>
  );
}
export default TodoList;
