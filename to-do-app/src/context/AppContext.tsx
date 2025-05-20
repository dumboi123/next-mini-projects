"use client";
import React, { createContext, useState, ReactNode } from "react";

type todoContextType = {
  isFilter: boolean;
  setIsFilter: (isFilter: boolean) => void;
};

const todoContextDefaultValues: todoContextType = {
  isFilter: false,
  setIsFilter: () => {},
};

export const TodoContext = createContext<todoContextType>(
  todoContextDefaultValues
);

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [isFilter, setIsFilter] = useState<boolean>(
    todoContextDefaultValues.isFilter
  );

  return (
    <TodoContext.Provider value={{ isFilter, setIsFilter }}>
      {children}
    </TodoContext.Provider>
  );
};
