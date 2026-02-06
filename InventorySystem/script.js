class InventoryRepository {
    constructor() {
        this.products = [];
        this.id = 1;
    }

    add(name, quantity, price) {
        this.products.push({ id: this.id++, name, quantity, price });
    }

    list() {
        return this.products;
    }

    update(id, name, quantity, price) {
        let p = this.products.find(x => x.id === id);
        if (p) {
            p.name = name;
            p.quantity = quantity;
            p.price = price;
        }
    }

    delete(id) {
        this.products = this.products.filter(x => x.id !== id);
    }

    totalValue() {
        return this.products.reduce((sum, p) => sum + p.quantity * p.price, 0);
    }
}

const repo = new InventoryRepository();

function render() {
    const list = $("#productList");
    list.empty();

    repo.list().forEach(p => {
        const li = $(`
            <li data-id="${p.id}">
                <span>${p.name} (${p.quantity}) - ₹${p.price}</span>
                <div class="actions">
                    <button class="edit">✎</button>
                    <button class="delete">🗑</button>
                </div>
            </li>
        `);

        li.hide().slideDown(200);
        list.append(li);
    });

    $("#totalValue").text("Total Value: ₹" + repo.totalValue());
}

$("#addBtn").click(function () {
    const name = $("#name").val().trim();
    const qty = Number($("#qty").val());
    const price = Number($("#price").val());
    if (!name || qty <= 0 || price <= 0) return;

    repo.add(name, qty, price);
    $("#name, #qty, #price").val("");
    render();
});

$("#productList").on("click", ".delete", function () {
    const id = Number($(this).closest("li").data("id"));
    $(this).closest("li").slideUp(200, function () {
        repo.delete(id);
        render();
    });
});

$("#productList").on("click", ".edit", function () {
    const li = $(this).closest("li");
    const id = Number(li.data("id"));
    const p = repo.list().find(x => x.id === id);

    const name = prompt("Product name", p.name);
    const qty = prompt("Quantity", p.quantity);
    const price = prompt("Price", p.price);

    if (name && qty > 0 && price > 0) {
        repo.update(id, name.trim(), Number(qty), Number(price));
        render();
    }
});
