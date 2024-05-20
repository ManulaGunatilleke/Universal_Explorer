import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import TaskModal from './TaskModal';

describe('TaskModal', () => {
  test('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<TaskModal open={true} />);
    expect(getByText('New user')).toBeInTheDocument();
    expect(getByPlaceholderText('Task ID')).toBeInTheDocument();
    
  });

  test('submits form with valid data', async () => {
    const mockAddNewTask = jest.fn();
    const { getByText, getByPlaceholderText } = render(<TaskModal open={true} addNewTask={mockAddNewTask} />);

    fireEvent.change(getByPlaceholderText('Task ID'), { target: { value: '123456' } });
    fireEvent.change(getByPlaceholderText('Date'), { target: { value: '2024-04-23' } });
    fireEvent.change(getByPlaceholderText('Priority'), { target: { value: 'High' } });
    fireEvent.change(getByPlaceholderText('Description'), { target: { value: 'Test description' } });

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(mockAddNewTask).toHaveBeenCalledWith({
        taskId: '123456',
        date: '2024-04-23',
        priority: 'High',
        description: 'Test description'
      });
    });
  });

});
