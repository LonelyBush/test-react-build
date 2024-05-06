import { MouseEvent, useState } from 'react';

// песочница для работы с реактом

interface Todos {
  id: string;
  item: string;
  completed: boolean;
}

export default function TodoApp() {
  const [newItem, setNewItem] = useState('');
  const [todos, setToDos] = useState<Todos[]>([]);

  function getData(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    e.preventDefault();
    setToDos((currentTodo: Todos[]) => {
      return [
        ...currentTodo,
        { id: crypto.randomUUID(), item: newItem, completed: false },
      ];
    });
  }

  function toggleTodos(id: string, completed: boolean) {
    setToDos((currentTodo: Todos[]) => {
      return currentTodo.map((elem) => {
        if (elem.id === id) {
          return { ...elem, completed };
        }
        return elem;
      });
    });
    setNewItem('');
    console.log(completed);
  }

  function deleteTodo(id: string) {
    setToDos((currentTodo) => {
      return currentTodo.filter((elem) => elem.id !== id);
    });
  }
  return (
    <>
      <form className="enter">
        <label htmlFor="item">
          New Item
          <input
            value={newItem}
            onChange={(e) => {
              setNewItem(e.target.value);
            }}
            type="text"
            id="item"
          />
        </label>
        <button
          onClick={(e) => {
            getData(e);
          }}
          type="button"
          id="send-btn"
        >
          Add
        </button>
      </form>
      <h1>ToDo List</h1>
      <ul className="list">
        {todos.map((elem) => {
          return (
            <li key={elem.id}>
              <label className="item-todo" htmlFor="item-check">
                <input
                  className="input-todo"
                  onChange={(e) => {
                    toggleTodos(elem.id, e.target.defaultChecked);
                  }}
                  id="item-check"
                  type="checkbox"
                  defaultChecked={elem.completed}
                />
                {elem.item}
              </label>
              <button
                onClick={() => {
                  deleteTodo(elem.id);
                }}
                type="button"
                id="delete-btn"
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
