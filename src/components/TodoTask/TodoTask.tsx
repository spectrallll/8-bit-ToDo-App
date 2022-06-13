import React, {FormEvent} from "react";
import classNames from "classnames";

interface TodoTaskProps {
    value: string,
    id: string,
    active: boolean
    changeTaskTitle: (value: string, id: string) => void,
    doneTask: (id: string) => void,
    removeTask: (id: string) => void
}

const TodoTask: React.FC<TodoTaskProps> = ({value, changeTaskTitle, id, active, doneTask, removeTask}) => {

    const [open, setOpen] = React.useState(false);
    const [editMode, setEditMode] = React.useState(false);
    const [newTitle, setNewTitle] = React.useState<string>('');

    const onChange = () => {
        setOpen(!open);
        setEditMode(false);
    }

    const onChangeTaskName = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newTitle === '') {
            alert('The name of the task cannot be empty');
            return;
        }
        changeTaskTitle(newTitle, id);
        setEditMode(!editMode);
        setNewTitle('');
    }

    return (
        <>
            {active ? <li data-testid='task' className={'to-do__task'}>
                <form data-testid='form-edit' onSubmit={(e) => onChangeTaskName(e)}
                      className={classNames("to-do__field nes-field", !editMode && 'hidden')}>
                    <label className="to-do-comm__label" htmlFor="">New title</label>
                    <input value={newTitle} data-testid='input-edit' type="text" id="name_field" className="to-do-edit__input nes-input"
                           onChange={(e) => setNewTitle(e.target.value)}/>
                </form>
                <div data-testid='layers' className={classNames("to-do__buttons", !open && 'hidden')}>
                    <button data-testid='btn-edit' className="to-do-task__edit nes-btn" onClick={() => setEditMode(!editMode)}>Edit</button>
                    <button data-testid='btn-success' className="to-do-task__succes nes-btn is-success" onClick={() => doneTask(id)}>
                        Success
                    </button>
                </div>
                <label data-testid='task-name' className="to-do-task__body">
                    <input type="checkbox" checked={open} className="to-do-task__checkbox nes-checkbox is-dark"
                           onChange={() => onChange()}/>
                    <span className="to-do-task__name">{value}</span>
                </label>
            </li>
                :
                <li className="to-do__task to-do__task_done" data-testid='task-done'>
                <div className="to-do__buttons to-do__btn-done">
                <button data-testid='btn-remove' onClick={() => removeTask(id)} className="to-do-task__remove nes-btn is-error">Remove</button>
                </div>
                <label className="to-do-task__body">
                <input type="checkbox" readOnly={true} checked={true} className="to-do-task__checkbox nes-checkbox is-dark" />
                <span className="to-do-task__name">{value}</span>
                </label>
                </li>}
        </>
    )
}

export default TodoTask;