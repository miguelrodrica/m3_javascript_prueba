// Traer las tareas guardas para mostrarlas - GET
async function getTasks() {
    const response = await fetch('http://localhost:3000/tasks');
    const tasks = await response.json();

    tasksContainer.innerHTML = '';

    for (let task of tasks) {
        tasksContainer.innerHTML += `
            <tr>
                <td>${task.id}</td>
                <td>${task.title}</td>
                <td>${task.category}</td>
                <td>${task.priority}</td>
                <td>${task.status}</td>
                <td>${task.duedate}</td>
                <td>${task.description}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="loadTask('${task.id}')">
                        Edit
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteTask('${task.id}')">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    };
};