import "./App.css";
import { useState, useEffect } from "react";
import TodoContainer from "./components/TodoContainer";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    darkMode ? root.classList.add("dark") : root.classList.remove("dark");
  }, [darkMode]);
  return (
    <div
      className={`w-full h-full flex justify-center ${
        darkMode ? "dark-bg" : "light-bg"
      }`}
    >
      <TodoContainer setDarkMode={setDarkMode} darkMode={darkMode} />
    </div>
  );
}

export default App;
