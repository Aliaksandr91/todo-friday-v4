import React, { ChangeEvent, useCallback } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { EditableSpan } from "common/components";
import { TaskStatuses } from "common/enums";
import { TaskType } from "../../../api/tasks/tasks.api.type";
import { useActions } from "../../../../../common/hooks";
import { tasksThunks } from "../../../model/tasksSlice";
import styles from "./Task.module.css";

type Props = {
  task: TaskType;
  todolistId: string;
};


// const changeTaskTitle = useCallback(function (taskId: string, title: string, todolistId: string) {
//   updateTask({ taskId, domainModel: { title }, todolistId });
// }, []);
export const Task = React.memo(({ todolistId, task }: Props) => {

  const { removeTask, updateTask } = useActions(tasksThunks);
  const removeTaskHandler = () => removeTask({ taskId: task.id, todolistId: todolistId });

  const changeTaskStatusHandler =
    (e: ChangeEvent<HTMLInputElement>) => {
      const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
      updateTask({ taskId: task.id, domainModel: { status }, todolistId });


    };

  const changeTaskTitleHandler =
    (title: string) => {
      updateTask({ taskId: task.id, domainModel: { title }, todolistId });
    };

  return (
    <div key={task.id} className={task.status === TaskStatuses.Completed ? styles.isDone : ""}>
      <Checkbox checked={task.status === TaskStatuses.Completed} color="primary" onChange={changeTaskStatusHandler} />

      <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});
