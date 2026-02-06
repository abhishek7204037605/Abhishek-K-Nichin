class PlaylistRepository {
    constructor() {
        this.songs = [];
        this.id = 1;
    }

    add(title, artist, duration) {
        this.songs.push({ id: this.id++, title, artist, duration });
    }

    list() {
        return this.songs;
    }

    update(id, title, artist, duration) {
        let s = this.songs.find(x => x.id === id);
        if (s) {
            s.title = title;
            s.artist = artist;
            s.duration = duration;
        }
    }

    delete(id) {
        this.songs = this.songs.filter(x => x.id !== id);
    }

    totalDuration() {
        return this.songs.reduce((sum, s) => sum + s.duration, 0);
    }
}

const repo = new PlaylistRepository();

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
}

function render() {
    const ul = $("#songList");
    ul.empty();

    repo.list().forEach(s => {
        const li = $(`
            <li data-id="${s.id}">
                <div class="info">
                    <strong>${s.title}</strong>
                    <span>${s.artist}</span>
                    <span>${formatTime(s.duration)}</span>
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

    $("#totalDuration").text("Total Duration: " + formatTime(repo.totalDuration()));
}

$("#addBtn").click(function () {
    const title = $("#title").val().trim();
    const artist = $("#artist").val().trim();
    const duration = Number($("#duration").val());

    if (!title || !artist || duration <= 0) return;

    repo.add(title, artist, duration);
    $("#title, #artist, #duration").val("");
    render();
});

$("#songList").on("click", ".delete", function () {
    const id = Number($(this).closest("li").data("id"));
    $(this).closest("li").slideUp(200, function () {
        repo.delete(id);
        render();
    });
});

$("#songList").on("click", ".edit", function () {
    const li = $(this).closest("li");
    const id = Number(li.data("id"));
    const s = repo.list().find(x => x.id === id);

    const title = prompt("Title", s.title);
    const artist = prompt("Artist", s.artist);
    const duration = prompt("Duration (seconds)", s.duration);

    if (title && artist && duration > 0) {
        repo.update(id, title.trim(), artist.trim(), Number(duration));
        render();
    }
});
