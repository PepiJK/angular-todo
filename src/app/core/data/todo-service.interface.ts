import { TodoItem } from '../models/todo-item';

export interface TodoService {
    getAllTodos(): TodoItem[];
    getTodo(id: string): TodoItem;
    upsertTodo(todo: TodoItem): void;
    toggleTodoIsDone(id: string): void;
    deleteTodo(id: string): void;
}