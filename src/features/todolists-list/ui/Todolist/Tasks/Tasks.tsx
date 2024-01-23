import { Task } from "./Task/Task";
import React from "react";
import { TaskStatuses } from "../../../../../common/enums";
import { TodolistDomainType } from "../../../model/todolistsSlice";
import { TaskType } from "../../../api/tasks/tasks.api.type";
type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};
export const Tasks = ({tasks, todolist}:Props) => {
const {id, filter}=todolist
  let tasksForTodolist = tasks;

  if (filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }
  return (
    <div>
      {tasksForTodolist.map((t) => (
        <Task
          key={t.id}
          task={t}
          todolistId={id}
        />
      ))}
    </div>
  )
};