import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from './TodoItem';

describe('TodoItem', () => {
  const mockTodo = {
    _id: '1',
    text: 'Test todo',
    complete: false
  };

  test('renders todo text', () => {
    render(<TodoItem todo={mockTodo} />);
    expect(screen.getByText('Test todo')).toBeInTheDocument();
  });

  test('calls onComplete when checkbox clicked', () => {
    const onComplete = jest.fn();
    render(<TodoItem todo={mockTodo} onComplete={onComplete} />);
    fireEvent.click(screen.getByRole('button', { name: /mark complete/i }));
    expect(onComplete).toHaveBeenCalledWith('1');
  });
}); 