import React, { useCallback, useEffect } from "react";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import {
  TodolistDomainType, todolistsThunks
} from "features/todolists-list/model/todolistsSlice";
import { tasksThunks } from "features/todolists-list/model/tasksSlice";
import { useActions } from "common/hooks";
import { AddItemForm, EditableSpan } from "common/components";
import { TaskType } from "../../api/tasks/tasks.api.type";
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons";
import { Tasks } from "./Tasks/Tasks";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";

type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Todolist = React.memo(function(props: Props) {
  const { fetchTasks, addTask } = useActions(tasksThunks);



  useEffect(() => {
    fetchTasks(props.todolist.id);
  }, []);

  const addTaskCb = useCallback(
    (title: string) => {
      addTask({ title, todolistId: props.todolist.id });
    },
    [props.todolist.id]
  );


  return (
    <div>
      <TodolistTitle todolist={props.todolist}/>
      <AddItemForm addItem={addTaskCb} disabled={props.todolist.entityStatus === "loading"} />
      <Tasks todolist={props.todolist} tasks={props.tasks} />
      <div style={{ paddingTop: "10px" }}>
        <FilterTasksButtons todolist={props.todolist} />
      </div>
    </div>
  );
});
