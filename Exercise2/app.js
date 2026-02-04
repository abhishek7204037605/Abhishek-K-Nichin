let empCollection = JSON.parse(localStorage.getItem("recs")) || [];

const save = () =>
    localStorage.setItem("recs", JSON.stringify(empCollection));

const nextId = () =>
    empCollection.length ? Math.max(...empCollection.map(e => e.id)) + 1 : 1;

const findEmployee = id =>
    empCollection.find(e => e.id === id);

$(document).ready(function () {

    $(".panel").hide();
    $("#editForm").hide();

    $("nav button").on("click", function () {
        $(".panel").slideUp();
        $("#editForm").hide();
        $($(this).data("target")).slideDown();
    });

    
    $("#addBtn").on("click", function () {
        const emp = {
            id: nextId(),
            name: $("#addName").val(),
            age: Number($("#addAge").val()),
            branch: $("#addBranch").val(),
            gender: $("#addGender").val(),
            address: $("#addAddress").val()
        };
        empCollection.push(emp);
        save();
        alert("Employee Added");
    });

    $("#loadBtn").on("click", function () {
        const rec = findEmployee(Number($("#updId").val()));
        if (!rec) return alert("Employee Not Found");

        $("#updName").val(rec.name);
        $("#updAge").val(rec.age);
        $("#updBranch").val(rec.branch);
        $("#updGender").val(rec.gender);
        $("#updAddress").val(rec.address);

        $("#editForm").fadeIn();
    });

    $("#saveBtn").on("click", function () {
        const id = Number($("#updId").val());
        empCollection = empCollection.map(e =>
            e.id === id ? {
                ...e,
                name: $("#updName").val(),
                age: Number($("#updAge").val()),
                branch: $("#updBranch").val(),
                gender: $("#updGender").val(),
                address: $("#updAddress").val()
            } : e
        );
        save();
        alert("Employee Updated");
        $("#editForm").hide();
    });

    $("#deleteBtn").on("click", function () {
        const id = Number($("#delId").val());
        empCollection = empCollection.filter(e => e.id !== id);
        save();
        alert("Employee Deleted");
    });

    $("nav button[data-target='#listPanel']").on("click", renderTable);

    $("#empTable").on("click", ".delRow", function () {
        const id = Number($(this).data("id"));
        empCollection = empCollection.filter(e => e.id !== id);
        save();
        renderTable();
    });

    function renderTable() {
        $("#empTable").empty();
        empCollection.forEach(e => {
            $("#empTable").append(`
                <tr>
                    <td>${e.id}</td>
                    <td>${e.name}</td>
                    <td>${e.age}</td>
                    <td>${e.branch}</td>
                    <td>${e.gender}</td>
                    <td>${e.address}</td>
                    <td><button class="danger delRow" data-id="${e.id}">Delete</button></td>
                </tr>
            `);
        });
    }
});
