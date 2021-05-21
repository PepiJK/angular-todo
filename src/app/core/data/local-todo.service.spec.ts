import { TestBed } from '@angular/core/testing';

import { LocalTodoService } from './local-todo.service';

describe('LocalTodoService', () => {
    let service: LocalTodoService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LocalTodoService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
