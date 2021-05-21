import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

import { TodoItem } from '../models/todo-item';
import { TodoService } from './todo-service.interface';

@Injectable({
    providedIn: 'root'
})
export class LocalTodoService implements TodoService {
    private cachedTodoItems: TodoItem[] = [];
    private localstorageKey = 'todoItems';

    constructor() {
        const rawTodoItems = localStorage.getItem(this.localstorageKey);

        if (rawTodoItems != null) {
            this.cachedTodoItems = JSON.parse(rawTodoItems);
        }
    }

    getAllTodos(): TodoItem[] {
        return this.cachedTodoItems;
    }

    getTodo(id: string): TodoItem {
        return this.cachedTodoItems.filter(item => item.id === id)[0];
    }

    upsertTodo(todo: TodoItem): void {
        if (todo.id) {
            this.cachedTodoItems = this.cachedTodoItems.filter(item => item.id !== todo.id);
        } else {
            todo.id = uuidv4();
        }

        this.cachedTodoItems.push(todo);
        localStorage.setItem(this.localstorageKey, JSON.stringify(this.cachedTodoItems));
    }

    toggleTodoIsDone(id: string): void {
        const todo = this.getTodo(id);
        todo.isDone = !todo.isDone;
        this.upsertTodo(todo);
    }

    deleteTodo(id: string): void {
        this.cachedTodoItems = this.cachedTodoItems.filter(item => item.id !== id);
        localStorage.setItem(this.localstorageKey, JSON.stringify(this.cachedTodoItems));
    }
}
