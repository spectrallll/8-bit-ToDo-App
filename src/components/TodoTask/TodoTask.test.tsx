import {fireEvent, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";
import React from "react";

describe('Task test', () => {

    test('Show/hide buttons', () => {
        render(<App/>);

        const btnConfirm = screen.getByTestId('btn-confirm');
        const input = screen.getByTestId('input-create');
        expect(input).toContainHTML('');
        userEvent.type(input, 'Hello world')
        expect(input).toContainHTML('Hello world')
        userEvent.click(btnConfirm);

        const taskBody = screen.getByTestId('task-name');
        expect(screen.getByTestId('layers')).toHaveClass('hidden');
        userEvent.click(taskBody);
        expect(screen.getByTestId('layers')).not.toHaveClass('hidden');
    });

    test('Show/hide edit mode', () => {
        render(<App />)
        const editBtn = screen.getByTestId('btn-edit');
        expect(screen.getByTestId('form-edit')).toHaveClass('hidden');
        userEvent.click(editBtn);
        expect(screen.getByTestId('form-edit')).not.toHaveClass('hidden');
    });

    test('Change task name', () => {
        render(<App />)
        const form = screen.getByTestId('form-edit');
        const inputEdit = screen.getByTestId('input-edit');
        expect(inputEdit).toHaveTextContent('');
        userEvent.type(inputEdit, 'Learn guitar');
        expect(inputEdit).toContainHTML('Learn guitar');
        fireEvent.submit(form);
        expect(screen.queryByText('Hello world')).toBeNull();
        expect(screen.getByText('Learn guitar')).toBeInTheDocument();
    });

    test('Success task', () => {
        render(<App/>);
        const btnSuccess = screen.getByTestId('btn-success');
        expect(screen.getByTestId('task')).toBeInTheDocument();
        expect(screen.queryByTestId('task-done')).toBeNull();
        userEvent.click(btnSuccess);
        expect(screen.queryByTestId('task')).toBeNull();
        expect(screen.getByTestId('task-done')).toBeInTheDocument();
    });

    test('Remove done task', () => {
        render(<App />)
        const btnRemove = screen.getByTestId('btn-remove');
        expect(screen.getByTestId('task-done')).toBeInTheDocument();
        userEvent.click(btnRemove);
        expect(screen.queryByTestId('task-done')).toBeNull();
    })


});