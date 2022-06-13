import React from "react";
import TodoTask from "./TodoTask/TodoTask";
import {Tasks} from "../types/taskTypes";

interface TodoListProps {
    tasks: Tasks,
    changeTaskTitle: (value: string, id: string) => void,
    doneTask: (id: string) => void,
    removeTask: (id: string) => void,
    filterProperty: number
}

const TodoList: React.FC<TodoListProps> = ({tasks, changeTaskTitle, doneTask, removeTask, filterProperty}) => {

    const filteredTasks = tasks.filter(obj => {
        if (filterProperty === 1) return obj.active;
        if (filterProperty === 2) return !obj.active;
        return obj;
    })

    return (
        <ul data-testid='task-list' className="to-do__tasks">
            {filteredTasks.map((el, i) => <TodoTask key={i} value={el.value} changeTaskTitle={changeTaskTitle} id={el.id } active={el.active} doneTask={doneTask} removeTask={removeTask}/>)}
        </ul>
    );
}

export default TodoList;