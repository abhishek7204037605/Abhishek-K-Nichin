class OrderRepository {
    constructor() {
        this.orders = [];
        this.id = 1;
    }

    add(items) {
        this.orders.push({ id: this.id++, items, status: "pending" });
    }

    list() {
        return this.orders;
    }

    update(id, items) {
        let o = this.orders.find(x => x.id === id);
        if (o) o.items = items;
    }

    delete(id) {
        this.orders = this.orders.filter(x => x.id !== id);
    }

    nextStatus(id) {
        let o = this.orders.find(x => x.id === id);
        if (!o) return;

        if (o.status === "pending") o.status = "shipped";
        else if (o.status === "shipped") o.status = "delivered";
    }
}

const repo = new OrderRepository();

function render() {
    const list = $("#orderList");
    list.empty();

    repo.list().forEach(o => {
        const li = $(`
            <li data-id="${o.id}">
                <div class="top">
                    <span>Order #${o.id}</span>
                    <span class="status">${o.status}</span>
                </div>
                <div>${o.items}</div>
                <div class="actions">
                    <button class="next">Next Status</button>
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </div>
            </li>
        `);

        li.hide().slideDown(200);
        list.append(li);
    });
}

$("#addBtn").click(function () {
    const items = $("#items").val().trim();
    if (!items) return;

    repo.add(items);
    $("#items").val("");
    render();
});

$("#orderList").on("click", ".delete", function () {
    const id = Number($(this).closest("li").data("id"));
    $(this).closest("li").slideUp(200, function () {
        repo.delete(id);
        render();
    });
});

$("#orderList").on("click", ".edit", function () {
    const li = $(this).closest("li");
    const id = Number(li.data("id"));
    const o = repo.list().find(x => x.id === id);

    const items = prompt("Edit items", o.items);
    if (items && items.trim() !== "") {
        repo.update(id, items.trim());
        render();
    }
});

$("#orderList").on("click", ".next", function () {
    const id = Number($(this).closest("li").data("id"));
    repo.nextStatus(id);
    render();
});
