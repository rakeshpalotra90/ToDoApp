import React, {
  useContext,
  createContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import gql from "graphql-tag";
import { useApolloClient, useQuery } from "@apollo/client";

const taskContext = createContext<TasksProvider | null>(null);

export const useTasks = () => useContext<TasksProvider | null>(taskContext);

export function ProvideTasks({ children }: any) {
  const value = _useTasks();
  return <taskContext.Provider value={value}>{children}</taskContext.Provider>;
}

type Tags = {
  id: number;
  title: string;
}
export interface Task {
  id: number;
  text: string;
  completed: boolean;
  priority: boolean;
  repeat: boolean;
  tags: Tags[];
  timeStamp: number | null;
  comment: number;
};

interface TasksProvider {
  tasks: Task[];
  loading: boolean;
  toggleTodo: (id: number) => void;
}

function _useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const apollo = useApolloClient();
  const { data, loading, error } = useQuery(GET_ALL_TODOS);

  useEffect(() => {
    if (!data?.todos) return;
    setTasks(data?.todos ?? []);
  }, [data]);

  const toggleTodo = (id: number) => {
    return apollo.mutate({
      mutation: TOGGLE_TODO,
      variables: {
        id,
      },
    });
  };

  return useMemo(
    () => ({
      tasks,
      loading,
      toggleTodo,
    }),
    [tasks, loading]
  );
}

export const GET_ALL_TODOS = gql`
  query GetAllTodos {
    todos @client {
      id
      text
      completed
      priority
      repeat
      tags
      timeStamp
      comment
    }
  }
`;

const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: Int!) {
    toggleTodo(id: $id) @client
  }
`;