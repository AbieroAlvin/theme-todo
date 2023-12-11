import { FaTrashAlt, FaEdit } from "react-icons/fa";

const Todo = ({ task, toggleComplete, deleteTodo, editTodo }) => {
  return (
    <div className="flex items-center justify-between lg:min-w-[480px] w-full min-w-[320px] py-2 ">
      <p
        className={` text-[var(--Very-Dark-light-Grayish-Blue)] dark:text-[var(--Dark-Grayish-Blue)] text-[15px] pt-1 ${
          task.completed
            ? "line-through text-[var(--Dark-light-Grayish-Blue)] opacity-40"
            : ""
        }`}
        onClick={() => toggleComplete(task.id)}
      >
        {task.text}
      </p>
      <div className="flex gap-2">
        <FaEdit
          onClick={() => editTodo(task.id)}
          className="cursor-pointer dark:text-[var(--Dark-Grayish-Blue)]"
        />
        <FaTrashAlt
          onClick={() => deleteTodo(task.id)}
          className="cursor-pointer dark:text-[var(--Dark-Grayish-Blue)]"
        />
      </div>
    </div>
  );
};

export default Todo;
