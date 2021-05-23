import { Component } from '@angular/core';
import { LocalTodoService } from 'src/app/core/data/local-todo.service';
import { TodoItem } from 'src/app/core/models/todo-item';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    todoItems: TodoItem[];

    constructor(private localTodoService: LocalTodoService) {
        this.todoItems = this.fetchAndSortAllTodoItems();
    }

    toggleTodoIsDone(id: string): void {
        this.localTodoService.toggleTodoIsDone(id);
        this.todoItems = this.fetchAndSortAllTodoItems();
    }

    deleteTodo(id: string): void {
        this.localTodoService.deleteTodo(id);
        this.todoItems = this.fetchAndSortAllTodoItems();
    }

    private fetchAndSortAllTodoItems(): TodoItem[] {
        return this.localTodoService.getAllTodos()
            .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
            .sort((a, b) => Number(a.isDone) - Number(b.isDone));
    }
}
