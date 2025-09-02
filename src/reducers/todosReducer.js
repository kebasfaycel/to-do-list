export default function reducer(currentTodos, action) {
  const { type, payload } = action;
  if (type === "done") {
    return currentTodos.map((t) => {
      if (t.key === payload) return { ...t, done: !t.done };
      return t;
    });
  } else if (type === "delete") {
    return currentTodos.filter((t) => {
      return t.key !== payload;
    });
  } else if (type === "edit") {
    const { editId, inputValues } = payload;
    return currentTodos.map((t) => {
      if (editId === t.key)
        return {
          ...t,
          title: inputValues.title,
          description: inputValues.description,
        };
      return t;
    });
  } else if (type === "add") {
    return [...currentTodos, payload];
  }
}
