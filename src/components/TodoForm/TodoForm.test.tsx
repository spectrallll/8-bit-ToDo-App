import {render, screen} from "@testing-library/react";
import App from "../../App";
import userEvent from "@testing-library/user-event";
import React from "react";

describe('Task create test', () => {
    render(<App/>);

    const btnConfirm = screen.getByTestId('btn-confirm');
    const input = screen.getByTestId('input-create');
    expect(input).toContainHTML('');
    userEvent.type(input, 'Do homework')
    expect(input).toContainHTML('Do homework')
    userEvent.click(btnConfirm);

    test('Clear input', () => {
        const input = screen.getByTestId('input-create');
        expect(input).toContainHTML('');
        userEvent.type(input, 'Gym')
        expect(input).toContainHTML('Gym')
        userEvent.click(btnConfirm);
        expect(input).toContainHTML('');
    });

    test('Create task', () => {
        render(<App/>)
        const btnConfirm = screen.getByTestId('btn-confirm');
        const input = screen.getByTestId('input-create');
        userEvent.type(input, 'Task')
        userEvent.click(btnConfirm);
        expect(screen.getByText('Task')).toBeInTheDocument();
        expect(screen.getByText('Task')).toHaveClass('to-do-task__name');
    });
});