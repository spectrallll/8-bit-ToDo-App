import React, {FormEvent} from "react";


interface ITodoFormProps {
    createTodo: (value: string, id: string) => void,
    length: number,
    removeAllMadeTasks: () => void
}

const TodoForm: React.FC<ITodoFormProps> = ({createTodo, length, removeAllMadeTasks}) => {

    const [value, setValue] = React.useState('');

    const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let id = String(Math.sqrt(length) + value);
        if (value === '') {
            alert('The name of the task cannot be empty')
            return;
        }
        createTodo(value, id);
        setValue('');
    }

    return (
        <form data-testid='form-create' className="to-do__form to-do-form" onSubmit={event => onSubmitForm(event)}>
            <input data-testid='input-create' type="text" value={value} onChange={(e) => setValue(e.target.value)} className="to-do-form__input-text nes-input is-success"
                   placeholder="Write name of task..." />
            <div className='btn-form'>
                <button data-testid='btn-confirm' className="to-do-form__btn nes-btn is-success">Create task</button>
                <button data-testid='btn-delete' type='button' onClick={() => removeAllMadeTasks()} className='nes-btn is-error'>Remove made</button>
            </div>
        </form>
    );
}

export default TodoForm;