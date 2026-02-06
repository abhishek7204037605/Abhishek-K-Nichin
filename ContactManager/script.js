class ContactRepository {
    constructor() {
        this.contacts = [];
        this.id = 1;
    }

    add(name, phone, email) {
        this.contacts.push({ id: this.id++, name, phone, email });
    }

    list() {
        return this.contacts;
    }

    update(id, name, phone, email) {
        let c = this.contacts.find(x => x.id === id);
        if (c) {
            c.name = name;
            c.phone = phone;
            c.email = email;
        }
    }

    delete(id) {
        this.contacts = this.contacts.filter(x => x.id !== id);
    }

    search(query) {
        query = query.toLowerCase();
        return this.contacts.filter(c =>
            c.name.toLowerCase().includes(query) ||
            c.email.toLowerCase().includes(query)
        );
    }
}

const repo = new ContactRepository();

function render(list = repo.list()) {
    const ul = $("#contactList");
    ul.empty();

    list.forEach(c => {
        const li = $(`
            <li data-id="${c.id}">
                <div class="info">
                    <strong>${c.name}</strong>
                    <span>${c.phone}</span>
                    <span>${c.email}</span>
                </div>
                <div class="actions">
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </div>
            </li>
        `);

        li.hide().slideDown(200);
        ul.append(li);
    });
}

$("#addBtn").click(function () {
    const name = $("#name").val().trim();
    const phone = $("#phone").val().trim();
    const email = $("#email").val().trim();
    if (!name || !phone || !email) return;

    repo.add(name, phone, email);
    $("#name, #phone, #email").val("");
    render();
});

$("#contactList").on("click", ".delete", function () {
    const id = Number($(this).closest("li").data("id"));
    $(this).closest("li").slideUp(200, function () {
        repo.delete(id);
        render();
    });
});

$("#contactList").on("click", ".edit", function () {
    const li = $(this).closest("li");
    const id = Number(li.data("id"));
    const c = repo.list().find(x => x.id === id);

    const name = prompt("Name", c.name);
    const phone = prompt("Phone", c.phone);
    const email = prompt("Email", c.email);

    if (name && phone && email) {
        repo.update(id, name.trim(), phone.trim(), email.trim());
        render();
    }
});

$("#search").on("input", function () {
    const query = $(this).val().trim();
    if (!query) render();
    else render(repo.search(query));
});
