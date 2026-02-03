const form = document.querySelector('#createTaskForm');
const idTask = document.querySelector('#taskId');
const titleTask = document.querySelector('#taskTitle');
const categoryTask = document.querySelector('#taskCategory');
const priorityTask = document.querySelector('#taskPriority');
const statusTask = document.querySelector('#taskStatus');
const dueDateTask = document.querySelector('#taskDueDate');
const descriptionTask = document.querySelector('#taskDescription');
const btnSaveTask = document.querySelector('#btnSaveTask');
const tasksContainer = document.querySelector('#tasksContainer');
// Variable de control para saber si estoy editando o creando una tarea
let editingTaskId = null;

// Este evento escucha el submit del formulario de creación o edición de Task (Decide POST o PUT)
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (editingTaskId === null) {
        await createTask();
    } else {
        await updateTask();
    }

    form.reset();
    getTasks();
});

showNameUser()
function showNameUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    const box = document.querySelector('#userNameBox');

    box.innerHTML = `<p class="card-text fs-4 fw-bold">${user.name}</p>`;
};

// Create Task - POST
async function createTask() {
    const response = await fetch('http://localhost:3000/tasks');
    const tasks = await response.json();
    const user = JSON.parse(localStorage.getItem('user'));
    let idExists = false;

    for (let task of tasks) {
        if (task.id === idTask.value) {
            idExists = true;
            break;
        }
    }

    if (idExists) {
        alert('Este ID de tarea ya está registrado');
        return;
    }

    const newTask = {
        id: idTask.value,
        userId: user.id,
        title: titleTask.value,
        category: categoryTask.value,
        priority: priorityTask.value,
        status: statusTask.value,
        duedate: dueDateTask.value,
        description: descriptionTask.value
    };

    await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
    });

    alert('Tarea creada correctamente');
};

// Traer las tareas guardas para mostrarlas - GET
async function getTasks() {
    const response = await fetch("http://localhost:3000/tasks");
    const tasks = await response.json();
    const user = JSON.parse(localStorage.getItem('user'));
    
    tasksContainer.innerHTML = ''; 

    for (let task of tasks) {
        if (task.userId === user.id)
        tasksContainer.innerHTML += `
            <div class="col-md-3">
                <div class="card my-3 h-100">
                    <div class="card-header text-center">
                        <h5 class="card-title ">Task Title: <b>${task.title}</b></h5>
                        <h6 class="card-subtitle text-secondary">ID: ${task.id}</h6>
                    </div>
                    <div class="card-body">
                        <p class="card-text">Category: ${task.category}</p>
                        <p class="card-text">Priority: ${task.priority}</p>
                        <p class="card-text">Status: ${task.status}</p>
                        <p class="card-text">Description: ${task.description}</p>
                        <p class="card-text">Due Date: ${task.duedate}</p>
                    </div>
                    <div class="card-footer text-center">
                        <button class="btn btn-warning btn-sm" onclick="loadTask('${task.id}')">
                            Edit
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="deleteTask('${task.id}')">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
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
    btnSaveTask.textContent = 'Edit Task';
};

// UPDATE - PUT
async function updateTask() {
    const user = JSON.parse(localStorage.getItem('user'));

    const updatedTask = {
        id: idTask.value,
        userId: user.id,
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
    btnSaveTask.textContent = 'Save Task';
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