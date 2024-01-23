import React, { useCallback, useEffect } from "react";
import { Delete } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { Task } from "./Task/Task";
import {
  TodolistDomainType,
  todolistsActions, todolistsThunks
} from "features/todolists-list/model/todolistsSlice";
import { tasksThunks } from "features/todolists-list/model/tasksSlice";
import { TaskStatuses } from "common/enums";
import { useActions } from "common/hooks";
import { AddItemForm, EditableSpan } from "common/components";
import { TaskType } from "../../api/tasks/tasks.api.type";
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons";

type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Todolist = React.memo(function(props: Props) {
  const { fetchTasks, addTask } = useActions(tasksThunks);

  const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks);

  useEffect(() => {
    fetchTasks(props.todolist.id);
  }, []);

  const addTaskCb = useCallback(
    (title: string) => {
      addTask({ title, todolistId: props.todolist.id });
    },
    [props.todolist.id]
  );

  const removeTodolistCb = () => {
    removeTodolist(props.todolist.id);
  };

  const changeTodolistTitleCb = useCallback(
    (title: string) => {
      changeTodolistTitle({ id: props.todolist.id, title });
    },
    [props.todolist.id]
  );



  let tasksForTodolist = props.tasks;

  if (props.todolist.filter === "active") {
    tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (props.todolist.filter === "completed") {
    tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.Completed);
  }

  return (
    <div>
      <h3>
        <EditableSpan value={props.todolist.title} onChange={changeTodolistTitleCb} />
        <IconButton onClick={removeTodolistCb} disabled={props.todolist.entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskCb} disabled={props.todolist.entityStatus === "loading"} />
      <div>
        {tasksForTodolist.map((t) => (
          <Task
            key={t.id}
            task={t}
            todolistId={props.todolist.id}
          />
        ))}
      </div>
      <div style={{ paddingTop: "10px" }}>
        <FilterTasksButtons todolist={props.todolist}/>
      </div>
    </div>
  );
});
