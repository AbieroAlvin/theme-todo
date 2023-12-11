import { useEffect, useState, FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";
import EditTodoForm from "./EditTodoForm";
import Filter from "./Filter";
import check from "../assets/images/icon-check.svg";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  isEditing: boolean;
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Load tasks from local storage on mount
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    // Save tasks to local storage whenever tasks change
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;

    const newTaskObj: Task = {
      id: uuidv4(),
      text: newTask,
      completed: false,
      isEditing: false,
    };

    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  const editTask = (id: string, newText: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, text: newText, isEditing: !task.isEditing }
        : task
    );

    setTasks(updatedTasks);
  };

  const editTodo = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  };

  const removeTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const toggleComplete = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );

    setTasks(updatedTasks);
  };

  const clearCompleted = () => {
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") {
      return true;
    } else if (filter === "active") {
      return !task.completed;
    } else {
      return task.completed;
    }
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addTask();
  };

  const handleDragDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedStores = [...filteredTasks];

      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedStore] = reorderedStores.splice(sourceIndex, 1);
      reorderedStores.splice(destinationIndex, 0, removedStore);
      return setTasks(reorderedStores);
    }
  };

  return (
    <section className="w-full flex flex-col py-[40px] items-center">
      <DragDropContext onDragEnd={handleDragDrop}>
        <form
          onSubmit={handleSubmit}
          className="flex gap-3 w-full items-center justify-center"
        >
          <input
            className="py-3 px-14 lg:max-w-[480px] bg-[var(--Very-Light-Grayish-Blue)] text-[var(--Dark-light-Grayish-Blue)] dark:bg-[var(--Very-Dark-Desaturated-Blue)] rounded-md font-medium text-white w-full"
            type="text"
            value={newTask}
            placeholder="Create a new todo.."
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            type="submit"
            onClick={() => addTask(newTask)}
            className="hidden"
          ></button>
        </form>
        <Droppable droppableId="todo-list" type="group">
          {(provided) => (
            <div
              className="flex flex-col gap-3 mt-8"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {filteredTasks.map((task, index) => (
                <Draggable draggableId={task.id} key={task.id} index={index}>
                  {(provided) => (
                    <div
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      className="flex px-4 py-2 bg-[var(--L-Grayish-Blue)] gap-2 items-center rounded-md dark:bg-[var(--Very-Dark-Desaturated-Blue)] w-full"
                    >
                      <input
                        type="checkbox"
                        checked={task.completed}
                        className="relative peer shrink-0 appearance-none border-2 bg-white dark:bg-[var(--Very-Dark-Desaturated-Blue)] dark:border-[var(--Very-Dark-Grayish-Blue)] border-gray-100 h-5 w-5 rounded-full checked:bg-gradient-to-r from-[var(--check-bg-cyan)] to-[var(--check-bg-purple)]  checked:border-0"
                        onChange={() => toggleComplete(task.id)}
                      />
                      <img
                        src={check}
                        alt="check"
                        className=" 
         absolute 
         w-3 h-3 mt-1
         hidden peer-checked:block peer-checked:-translate-y-[1px] peer-checked:translate-x-[4px] pointer-events-none"
                      />

                      {task.isEditing ? (
                        <EditTodoForm editTodo={editTask} task={task} />
                      ) : (
                        <Todo
                          task={task}
                          toggleComplete={toggleComplete}
                          deleteTodo={removeTask}
                          editTodo={editTodo}
                        />
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div>
        <Filter
          setFilter={setFilter}
          clearCompleted={clearCompleted}
          tasks={tasks}
          filter={filter}
        />
      </div>
      <div className="mt-8 text-center text-[var(--Very-Dark-light-Grayish-Blue)]">
        <p>Drag and drop to reorder list</p>
      </div>
    </section>
  );
};

export default TodoList;
