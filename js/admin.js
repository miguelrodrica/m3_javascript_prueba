const form = document.querySelector('#createTaskForm');
const idTask = document.querySelector('#taskId');
idTask.disabled = true;
const titleTask = document.querySelector('#taskTitle');
const categoryTask = document.querySelector('#taskCategory');
const priorityTask = document.querySelector('#taskPriority');
const statusTask = document.querySelector('#taskStatus');
const dueDateTask = document.querySelector('#taskDueDate');
const descriptionTask = document.querySelector('#taskDescription');
const btnEditTask = document.querySelector('#btnEditTask');
const tasksContainer = document.querySelector('#tasksContainer');
// Variable de control qué estoy editando
let editingTaskId = null;

// Este evento escucha el submit del formulario para ejecutar la edición - PUT
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    await updateTask();
    form.reset();
    getTasks();
});

// Mostrar el nombre el usuario en el Sidebar - GET
showNameUser()
function showNameUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    const box = document.querySelector('#userNameBox');

    box.innerHTML = `<p class="card-text fs-4 fw-bold">${user.name}</p>`;
};

// Traer las tareas para mostrarlas - GET
async function getTasks() {
    const response = await fetch('http://localhost:3000/tasks');
    const tasks = await response.json();

    tasksContainer.innerHTML = '';

    for (let task of tasks) {
        tasksContainer.innerHTML += `
            <tr>
                <td>${task.id}</td>
                <td>${task.userId}</td>
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
getTasks();

// Cargar la información de una tarea específica para editarla.
async function loadTask(id) {
    const response = await fetch(`http://localhost:3000/tasks/${id}`);
    const task = await response.json();

    idTask.value = task.id;
    titleTask.value = task.title;
    categoryTask.value = task.category;
    priorityTask.value = task.priority;
    statusTask.value = task.status;
    dueDateTask.value = task.duedate;
    descriptionTask.value = task.description;

    editingTaskId = task.id;
    idTask.disabled = true;
};

// UPDATE - PUT
async function updateTask() {
    const response = await fetch(`http://localhost:3000/tasks/${idTask.value}`);
    const task = await response.json();

    const updatedTask = {
        id: idTask.value,
        userId: task.userId,
        title: titleTask.value,
        category: categoryTask.value,
        priority: priorityTask.value,
        status: statusTask.value,
        duedate: dueDateTask.value,
        description: descriptionTask.value
    };

    await fetch(`http://localhost:3000/tasks/${editingTaskId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedTask)
    });

    alert('Tarea actualizada correctamente');

    editingTaskId = null;
    idTask.disabled = false;
};

// Eliminar una tarea
async function deleteTask(id) {
    const confirmDelete = confirm('¿Seguro que deseas eliminar esta tarea?');

    if (!confirmDelete) {
        return;
    }

    await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE'
    });

    alert('Tarea eliminada correctamente');
    getTasks();
};