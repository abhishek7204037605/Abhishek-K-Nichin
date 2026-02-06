class TodoRepository {
    constructor() {
        this.todos = [];
        this.id = 1;
    }

    add(text) {
        this.todos.push({ id: this.id++, text: text, completed: false });
    }

    list() {
        return this.todos;
    }

    update(id, newText) {
        let todo = this.todos.find(t => t.id === id);
        if (todo) todo.text = newText;
    }

    delete(id) {
        this.todos = this.todos.filter(t => t.id !== id);
    }

    toggleComplete(id) {
        let todo = this.todos.find(t => t.id === id);
        if (todo) todo.completed = !todo.completed;
    }
}

const repo = new TodoRepository();

function render() {
    const list = $("#todoList");
    list.empty();

    repo.list().forEach(todo => {
        const li = $(`
            <li data-id="${todo.id}" class="${todo.completed ? 'completed' : ''}">
                <span class="text">${todo.text}</span>
                <div class="actions">
                    <button class="complete">✓</button>
                    <button class="edit">✎</button>
                    <button class="delete">🗑</button>
                </div>
            </li>
        `);

        li.hide().slideDown(200);
        list.append(li);
    });
}

$("#addBtn").click(function () {
    const text = $("#todoInput").val().trim();
    if (!text) return;
    repo.add(text);
    $("#todoInput").val("");
    render();
});

$("#todoList").on("click", ".delete", function () {
    const id = Number($(this).closest("li").data("id"));
    $(this).closest("li").slideUp(200, function () {
        repo.delete(id);
        render();
    });
});

$("#todoList").on("click", ".complete", function () {
    const id = Number($(this).closest("li").data("id"));
    repo.toggleComplete(id);
    render();
});

$("#todoList").on("click", ".edit", function () {
    const li = $(this).closest("li");
    const id = Number(li.data("id"));
    const currentText = li.find(".text").text();
    const newText = prompt("Edit todo", currentText);
    if (newText !== null && newText.trim() !== "") {
        repo.update(id, newText.trim());
        render();
    }
});
