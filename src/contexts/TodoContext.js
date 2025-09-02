import { createContext, useReducer } from "react";
import reducer from "../reducers/todosReducer";
import { useContext } from "react";

 let TodoContext = createContext({});
export function TodosProvider({ children }) {
  const [todos, dispatch] = useReducer(reducer, [], () => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  return (
    <TodoContext.Provider value={{ todos: todos, dispatch: dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}
export const useTodos = () => {
  return useContext(TodoContext);
};
