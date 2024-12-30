import React from "react";
import toast from "react-hot-toast";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";
import TickIcon from "../icons/TickIcon";
import useSWR from "swr";
import { CircleUserRound, Plus } from "lucide-react";
import { Input } from "./ui/input";

const fetcher = (url, options = {}) => {
  return fetch(url, {
    method: options.method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    mode: "cors",
    body: options.body ? JSON.stringify(options.body) : undefined,
  }).then((res) => res.json()); // Make sure to return the result of res.json()
};

export const Todos = () => {
  const {
    data = [],
    error,
    mutate,
    isLoading,
  } = useSWR("http://localhost:3000/api/todos", fetcher);
  if (error) {
    return <h1 className="text-2xl py-2 text-center">Something went wrong!</h1>;
  }
  if (isLoading) {
    return <h1 className="text-2xl py-2 text-center">Loading...</h1>;
  }
  console.log(data);

  function handleError(error) {
    toast.error(error);
    throw new Error(error);
  }

  async function handleAddTodo(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");

    if (!title.trim().length) {
      toast.error("Todo can't be empty");
      return;
    }

    const newTodo = {
      title: `${title} adding...`,
      _id: Date.now().toString(),
      isCompleted: false,
    };

    async function addTodo() {
      const response = await fetcher("http://localhost:3000/api/todos/", {
        method: "POST",
        body: { title },
      });
      if (response.error) {
        handleError(response.error);
      }
      return [...data, response];
    }
    await mutate(addTodo, {
      optimisticData: [...data, newTodo],
      revalidate: true,
      rollbackOnError: true,
    });
    e.target.reset();

    // await mutate(
    //   async (currentData) => {
    //     const response = await fetcher("http://localhost:3000/api/todos/", {
    //       method: "POST",
    //       body: { title }, // Send the title in the body
    //     });

    //     if (response.error) {
    //       handleError(response.error);
    //       return currentData; // Return existing data if there's an error
    //     }

    //     // Append the new todo to the existing data
    //     return [...currentData, response];
    //   },
    //   {
    //     optimisticData: [...data, newTodo], // Show the new todo immediately
    //     revalidate: true, // Revalidate after the request is complete
    //     rollbackOnError: true, // Rollback if the request fails
    //   }
    // );

    // e.target.reset(); // Reset the form after adding the todo
  }

  return (
    <div className="mx-auto mt-20 max-w-lg px-4 w-full flex flex-col gap-6">
      <div>
        <CircleUserRound />
      </div>
      <h1 className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-bold text-4xl text-center mb-4 text-transparent bg-clip-text">
        Todo App
      </h1>
      <form onSubmit={handleAddTodo} className="flex gap-4 items-center">
        <Input
          type="text"
          placeholder="Enter todo"
          name="title"
          id="title"
          required
          className="shadow-md"
        />
        <button className="h-9 rounded-md border border-input bg-transparent px-4 text-base shadow-md flex items-center hover:bg-primary transition ease-linear group">
          <Plus
            size={20}
            className="transition ease-linear group-hover:stroke-white"
          />
        </button>
      </form>
      {data?.length ? (
        <div className="shadow-md border-2 border-input bg-transparent flex flex-col rounded">
          {data.map((todo, index) => (
            <div
              key={index}
              className={`flex h-10 items-center w-full ${
                index == data.length - 1 ? "border-b-0" : "border-b-2"
              }`}
            >
              <span
                className={`flex-1 px-3 ${
                  todo.isCompleted && "line-through text-[#63657b]"
                }`}
              >
                {todo.title}
              </span>
              <div className="px-3 flex gap-2">
                <TickIcon />
                <DeleteIcon />
                <EditIcon />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <span>"You don't have any todos"</span>
      )}
    </div>
  );
};
