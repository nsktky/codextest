function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const note = document.getElementById(data);
    if (note) {
        ev.currentTarget.appendChild(note);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('taskModal');
    const addBtn = document.getElementById('addTaskBtn');
    const closeBtn = document.getElementById('closeModal');
    const createBtn = document.getElementById('createTask');

    addBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    createBtn.addEventListener('click', () => {
        const content = document.getElementById('taskContent').value;
        const type = document.getElementById('taskType').value;
        const assignee = document.getElementById('taskAssignee').value;
        const color = document.getElementById('taskColor').value;

        if (!content) return;

        const note = document.createElement('div');
        note.className = 'note';
        note.draggable = true;
        note.id = 'task' + Date.now();
        note.style.backgroundColor = color;
        note.ondragstart = drag;
        note.innerHTML = `<div>${content}</div><div>${type}</div><div>${assignee}</div>`;

        document.getElementById('todo').appendChild(note);

        modal.style.display = 'none';
        document.getElementById('taskContent').value = '';
        document.getElementById('taskType').value = '';
        document.getElementById('taskAssignee').value = '';
        document.getElementById('taskColor').value = '#fffb8f';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
