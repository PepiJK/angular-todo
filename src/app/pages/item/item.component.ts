import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalTodoService } from 'src/app/core/data/local-todo.service';
import { TodoItem } from 'src/app/core/models/todo-item';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
    public isEditable = false;
    public todoForm: FormGroup;

    private todoIsDone = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private localTodoService: LocalTodoService,
        private fb: FormBuilder
    ) {
        this.todoForm = this.fb.group({
            title: ['', Validators.required],
            id: [''],
            description: [''],
            dueDate: ['', Validators.required]
        });
        this.todoForm.disable();
    }

    ngOnInit(): void {
        const type = this.router.url.split('/')[1];
        switch (type) {
            case 'new': {
                this.todoForm.enable();
                this.todoForm.controls['id'].disable();
                break;
            }
            case 'edit': {
                this.todoForm.enable();
                this.todoForm.controls['id'].disable();
                const id = this.route.snapshot.paramMap.get('id');
                if (id) {
                    const item = this.localTodoService.getTodo(id);
                    this.setFormValues(item);
                }
                break;;
            }
            case 'item': {
                const id = this.route.snapshot.paramMap.get('id');
                if (id) {
                    const item = this.localTodoService.getTodo(id);
                    this.setFormValues(item);
                }
                break;
            }
        }
    }

    submit(): void {
        this.localTodoService.upsertTodo({
            id: this.todoForm.controls['id'].value,
            title: this.todoForm.controls['title'].value,
            description: this.todoForm.controls['description'].value,
            dueDate: new Date(this.todoForm.controls['dueDate'].value),
            isDone: this.todoIsDone
        });
        this.router.navigate(['/home']);
    }

    private setFormValues(todo: TodoItem): void {
        this.todoForm.controls['id'].setValue(todo.id);
        this.todoForm.controls['title'].setValue(todo.title);
        this.todoForm.controls['description'].setValue(todo.description);
        this.todoForm.controls['dueDate'].setValue(formatDate(todo.dueDate, 'yyyy-MM-dd', 'en'));
        this.todoIsDone = todo.isDone;
    }

}
