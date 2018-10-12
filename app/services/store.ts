export class Todo {
	completed: Boolean;
	editing: Boolean;

	private _title: String;
    private _dueDate: String;
    private _priority: String;

	get title() {
		return this._title;
	}
	set title(value: String) {
		this._title = value.trim();
	}

    get dueDate(): String {
        return this._dueDate;
    }

    set dueDate(value: String) {
        this._dueDate = value;
    }

    get priority(): String {
        return this._priority;
    }

    set priority(value: String) {
        this._priority = value;
    }

	constructor(title: String, dueDate: String, priority: String) {
		this.completed = false;
		this.editing = false;
		this.title = title.trim();
		this.dueDate = dueDate;
		this.priority = priority;
	}
}

export class TodoStore {
	todos: Array<Todo>;

	constructor() {
		let persistedTodos = JSON.parse(localStorage.getItem('angular2-todos') || '[]');
		// Normalize back into classes
		this.todos = persistedTodos.map( (todo: {_title: String, _dueDate: String, _priority: String, completed: Boolean}) => {
			let ret = new Todo(todo._title, todo._dueDate, todo._priority);
			ret.completed = todo.completed;
			return ret;
		});
	}

	private updateStore() {
		localStorage.setItem('angular2-todos', JSON.stringify(this.todos));
	}

	private getWithCompleted(completed: Boolean) {
		return this.todos.filter((todo: Todo) => todo.completed === completed);
	}

	allCompleted() {
		return this.todos.length === this.getCompleted().length;
	}

	setAllTo(completed: Boolean) {
		this.todos.forEach((t: Todo) => t.completed = completed);
		this.updateStore();
	}

	removeCompleted() {
		this.todos = this.getWithCompleted(false);
		this.updateStore();
	}

	getRemaining() {
		return this.getWithCompleted(false);
	}

	getCompleted() {
		return this.getWithCompleted(true);
	}

	toggleCompletion(todo: Todo) {
		todo.completed = !todo.completed;
		this.updateStore();
	}

	remove(todo: Todo) {
		this.todos.splice(this.todos.indexOf(todo), 1);
		this.updateStore();
	}

	add(title: String, date: String, priority: String) {
		this.todos.push(new Todo(title, date, priority));
		this.updateStore();
	}
}
