const form = document.querySelector('#createTaskForm');
const idTask = document.querySelector('#taskId');
const titleTask = document.querySelector('#taskTitle');
const categoryTask = document.querySelector('#taskCategory');
const priorityTask = document.querySelector('#taskPriority');
const statusTask = document.querySelector('#taskStatus');
const dueDateTask = document.querySelector('#taskDueDate');
const descriptionTask = document.querySelector('#taskDescription');
const btnSaveTask = document.querySelector('#btnSaveTask');
const tasksList = document.querySelector('#tasksList');
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

// Create Task - POST
async function createTask() {
    const response = await fetch('http://localhost:3000/tasks');
    const tasks = await response.json();
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
    const response = await fetch('http://localhost:3000/tasks');
    const tasks = await response.json();

    tasksList.innerHTML = '';

    for (let task of tasks) {
        tasksList.innerHTML += `
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
    const updatedTask = {
        id: idTask.value,
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