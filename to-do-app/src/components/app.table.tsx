"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Todo } from "../types/Todo";
import { useContext } from "react";
import { TodoContext } from "../context/AppContext";
import { toast } from "react-toastify";

const AppTable = () => {
  const { isFilter } = useContext(TodoContext);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Lay du lieu tu localStorage khi ung dung chay
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTodos = localStorage.getItem("todos");
      if (savedTodos) setTodos(JSON.parse(savedTodos));
    }
  }, []);

  const filteredTodos = isFilter
    ? todos.filter((todo) => todo.completed)
    : todos.filter((todo) => !todo.completed);

  const addTodo = () => {
    if (title.trim() === "" || description.trim() === "") return;
    const newTodos = [
      ...todos,
      { id: Date.now(), title, description, completed: false },
    ];
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setTitle("");
    setDescription("");
    toast.success("Add todo succeed!");
  };

  const removeTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    toast.success("Delete todo succeed!");
  };

  const completeTodo = (id: number) => {
    console.log("completed:", id);

    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: true } : todo
    );
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    toast.success("Complete todo succeed!");
  };

  return (
    <div className="dark:bg-[hsl(var(--background-layout))] h-[calc(100vh-64px)] w-[100%] p-4 rounded-md scroll-pb-16">
      <div className="w-[100%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[50%] mx-auto flex flex-col sm:flex-row gap-2 mt-4 items-center">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border p-2 flex-1 rounded-md w-full sm:w-auto"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detail"
          className="border p-2 flex-1 rounded-md w-full sm:w-auto"
        />
        <button
          onClick={addTodo}
          className="bg-[#9395D3] text-white px-4 py-2 rounded-md hover:bg-[#7A7CB2] dark:bg-[#070a0d] dark:hover:bg-black dark:border dark:border-gray-100 w-full sm:w-auto"
        >
          Add
        </button>
      </div>

      <div className="space-y-4 pb-16">
        {filteredTodos.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <Image
              className="mt-10"
              src="/img/no-todo.png"
              alt="no-todos"
              width={100}
              height={100}
              priority
            />
            <div className="text-center text-[#7A7CB2] text-lg mt-2">
              {isFilter ? "There are no completed tasks" : "There are no tasks"}
            </div>
          </div>
        ) : (
          filteredTodos.map((todo, index) => (
            <div
              key={index}
              className="h-[82px] w-[100%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[50%] mx-auto bg-white dark:bg-black flex items-center my-7 border-opacity-25 border border-black dark:border-gray-200 rounded-md last:!mb-8"
            >
              <div className="flex flex-col justify-between flex-1 mx-5 pl-4">
                <div className="flex text-[#9395D3] uppercase font-bold">
                  {todo.title}
                </div>
                <div className="flex text-black dark:text-[#fff]">
                  {todo.description}
                </div>
              </div>

              <div className="flex flex-row items-center flex-1 justify-end mr-5 gap-5">
                {!todo.completed && (
                  <svg
                    onClick={() => completeTodo(todo.id)}
                    style={{ cursor: "pointer" }}
                    className="flex justify-center items-center w-[25px]"
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.20834 8.50019C1.20859 5.02154 3.6661 2.02748 7.07795 1.34906C10.4898 0.670638 13.9058 2.49679 15.2368 5.71073C16.5678 8.92467 15.4432 12.6313 12.5507 14.5637C9.6582 16.4962 5.80341 16.1163 3.34376 13.6564C1.97634 12.2889 1.2082 10.4341 1.20834 8.50019Z"
                      stroke="#B3B7EE"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.85419 8.50018L7.2844 10.9304L12.1459 6.06998"
                      stroke="#B3B7EE"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                <svg
                  onClick={() => removeTodo(todo.id)}
                  style={{ cursor: "pointer" }}
                  className="flex justify-center items-center w-[25px]"
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.8406 9.37512H8.15936C7.68014 9.37512 7.29166 9.76361 7.29166 10.2428V17.1876C7.29166 18.6259 8.45758 19.7918 9.89582 19.7918H15.1042C15.7948 19.7918 16.4572 19.5174 16.9456 19.029C17.434 18.5407 17.7083 17.8783 17.7083 17.1876V10.2428C17.7083 9.76361 17.3198 9.37512 16.8406 9.37512Z"
                    stroke="#B3B7EE"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.625 7.29175L15.5146 7.07196C14.9436 5.92982 13.7764 5.20833 12.4995 5.20833C11.2226 5.20833 10.0553 5.92982 9.48437 7.07196L9.375 7.29175H15.625Z"
                    stroke="#B3B7EE"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.5135 12.847C11.5135 12.4328 11.1777 12.097 10.7635 12.097C10.3493 12.097 10.0135 12.4328 10.0135 12.847H11.5135ZM10.0135 16.3189C10.0135 16.7331 10.3493 17.0689 10.7635 17.0689C11.1777 17.0689 11.5135 16.7331 11.5135 16.3189H10.0135ZM14.9864 12.847C14.9864 12.4328 14.6507 12.097 14.2364 12.097C13.8222 12.097 13.4864 12.4328 13.4864 12.847H14.9864ZM13.4864 16.3189C13.4864 16.7331 13.8222 17.0689 14.2364 17.0689C14.6507 17.0689 14.9864 16.7331 14.9864 16.3189H13.4864ZM15.625 6.54179C15.2108 6.54179 14.875 6.87758 14.875 7.29179C14.875 7.70601 15.2108 8.04179 15.625 8.04179V6.54179ZM17.7083 8.04179C18.1225 8.04179 18.4583 7.70601 18.4583 7.29179C18.4583 6.87758 18.1225 6.54179 17.7083 6.54179V8.04179ZM9.37499 8.04179C9.7892 8.04179 10.125 7.70601 10.125 7.29179C10.125 6.87758 9.7892 6.54179 9.37499 6.54179V8.04179ZM7.29166 6.54179C6.87744 6.54179 6.54166 6.87758 6.54166 7.29179C6.54166 7.70601 6.87744 8.04179 7.29166 8.04179V6.54179ZM10.0135 12.847V16.3189H11.5135V12.847H10.0135ZM13.4864 12.847V16.3189H14.9864V12.847H13.4864ZM15.625 8.04179H17.7083V6.54179H15.625V8.04179ZM9.37499 6.54179H7.29166V8.04179H9.37499V6.54179Z"
                    fill="#B3B7EE"
                  />
                </svg>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppTable;
