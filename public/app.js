new Vue({
	el: '#app',

	vuetify: new Vuetify({ theme: { dark: true } }),

	data() {
		return {
			todoTitle: '',
			todos: []
		};
	},

	created() {
		fetch('/api/todo', { method: 'get' })
			.then(res => res.json())
			.then((todos) => { this.todos = todos; })
			.catch(error => console.log(error));
	},

	methods: {
		addTodo() {
			const title = this.todoTitle.trim();
			if (!title) return;

			fetch('/api/todo', {
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({title})
			})
				.then(res => res.json())
				.then(({todo}) => {
					this.todos.push(todo);
					this.todoTitle = '';
				})
				.catch(error => console.log(error));
		},

		completeTodo(id) {
			fetch(`/api/todo/${id}`, { 
				method: 'put',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ done: true })
			})
				.then(res => res.json())
				.then(({todo}) => {
					const index = this.todos.findIndex(item => item.id === todo.id);
					this.todos[index].updatedAt = todo.updatedAt;
				})
				.catch(error => console.log(error));
			//this.todos = this.todos.filter(t => t.id !== id);
		},

		removeTodo(id) {
			fetch(`/api/todo/${id}`, { method: 'delete' })
				.then(_ => this.todos = this.todos.filter(t => t.id !== id))
				.catch(error => console.log(error));
		}
	},

	filters: {
		capitalize(value) {
			return value.toString().charAt(0).toUpperCase() + value.slice(1);
		},

		date(value, withTime) {
			const options = {
				year: 'numeric',
				month: 'long',
				day: '2-digit',
			};

			if (withTime) {
				options.hour = '2-digit';
				options.minute = '2-digit';
				options.second = '2-digit';
			}

			return new Intl.DateTimeFormat('en-EN', options).format(new Date(value));
		}
	}
});