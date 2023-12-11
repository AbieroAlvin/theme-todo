import { HiSun, HiMoon } from "react-icons/hi";

import TodoList from "./TodoList";

const TodoContainer = ({ setDarkMode, darkMode }) => {
  return (
    <section className="w-[60%] mt-20  flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="tracking-widest text-[var(--Very-Light-Grayish-Blue)] text-3xl">
          TODO
        </h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? (
            <HiSun className="text-3xl text-[var(--Very-Light-Grayish-Blue)]" />
          ) : (
            <HiMoon className="text-3xl text-[var(--Very-Light-Grayish-Blue)]" />
          )}
        </button>
      </div>
      <div className="mb-6">
        <TodoList />
      </div>
    </section>
  );
};

export default TodoContainer;
