import {Component} from 'angular2/core';
import {TodoStore, Todo} from './services/store';

@Component({
	selector: 'todo-app',
	templateUrl: 'app/app.html'
})
export default class TodoApp {
	todoStore: TodoStore;
    newTodoText = '';
    selectedDate = new Date().toLocaleDateString();
    selectedPriority = 1;

	constructor(todoStore: TodoStore) {
		this.todoStore = todoStore;

        $('#date-container .input-group.date').datepicker({
            keyboardNavigation: false,
            toggleActive: true,
            todayBtn: true,
            todayHighlight: true,
            keepEmptyValues: false,
            autoClose: true
        });
	}

	stopEditing(todo: Todo, editedTitle: string) {
		todo.title = editedTitle;
		todo.editing = false;
	}

	cancelEditingTodo(todo: Todo) {
		todo.editing = false;
	}

    getPriorityText(priority) {
		switch(priority.toString()) {
			case '1' : return 'Very High';
            case '2' : return 'High';
            case '3' : return 'Medium';
            case '4' : return 'Low';
		}
	}

	updateEditingTodo(todo: Todo, editedTitle: string) {
		editedTitle = editedTitle.trim();
		todo.editing = false;

		if (editedTitle.length === 0) {
			return this.todoStore.remove(todo);
		}

		todo.title = editedTitle;
	}

	editTodo(todo: Todo) {
		todo.editing = true;
	}

	removeCompleted() {
		this.todoStore.removeCompleted();
	}

	toggleCompletion(todo: Todo) {
		this.todoStore.toggleCompletion(todo);
	}

	remove(todo: Todo){
		this.todoStore.remove(todo);
	}

	addTodo() {
		if (this.newTodoText.trim().length) {
			this.todoStore.add(this.newTodoText, this.selectedDate, this.selectedPriority);
			this.newTodoText = '';
		}
	}
}
