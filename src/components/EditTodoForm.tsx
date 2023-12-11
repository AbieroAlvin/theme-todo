import { useState } from "react";
import { FaSave } from "react-icons/fa";

const EditTodoForm = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.text);

  const handleSubmit = (e) => {
    e.preventDefault();

    editTodo(task.id, value);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-between w-full gap-4"
    >
      <input
        type="text"
        value={value}
        placeholder="Update Task"
        onChange={(e) => setValue(e.target.value)}
        className="px-2 py-1 rounded-md outline-none focus:outline-purple-300 w-full text-[var(--Very-Dark-light-Grayish-Blue)] dark:text-[var(--Light-Grayish-Blue)] dark:bg-[var(--Very-Dark-Grayish-Blue)]"
      />
      <button
        type="submit"
        className="cursor-pointer dark:text-[var(--Dark-light-Grayish-Blue)]"
      >
        <FaSave />
      </button>
    </form>
  );
};

export default EditTodoForm;
