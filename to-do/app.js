let tasks = [];

const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-btn');
const tasksContainer = document.getElementById('tasks-container');

function createTask(text) {
    return {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };
}

function saveTasks() {
    localStorage.setItems('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const saved = localStorage.getItem('tasks');
    tasks = saved ? JSON.parse(saved) : [];
}

function addTask() {
    const text = taskInput.value.trim();
    if (text) {
        const newTask = createTask(text);
        renderTasks();
        saveTasks();
        taskInput.value = '';
        taskInput.focus();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
    saveTasks();
}

function setupEventListeners() {
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask(); // If user presses Enter instead of clicking on Add
    });
    tasksContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const taskId = parseInt(e.target.closest('.task').dataset.id);
            deleteTask(taskId);
        }
    });
    tasksContainer.addEventListener('change', (e) => {
        if (e.target.matches('input[type="checkbox"]')) {
            const taskId = parseInt(e.target.closest('.task').dataset.id);
            const task = tasks.find(t => t.id === taskId);
            task.completed = e.target.checked;
            renderTasks();
            saveTasks();
        }
    });
}

function renderTasks() {
    tasksContainer.innerHTML = '';

    if (tasks.length === 0) {
        tasksContainer.innerHTML = `<div class="empty-state">No tasks yet. Add your first task!</div>`;
        return;
    }

    const fragment = document.createDocumentFragment();

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = `task ${task.completed ? 'completed' : ''}`;
        taskElement.dataset.id = task.id;

        taskElement.innerHTML = `
            <div class="task-content">
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${task.text}</span>
            </div>
            <div class="task-actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        fragment.appendChild(taskElement);
    });

    tasksContainer.appendChild(fragment);
    updateCounter();
}

function updateCounter() {
    const activeTasks = tasks.filter(task => !task.completed).length;
    const totalTasks = tasks.length;
    document.getElementById('task-counter').textContent = `${activeTasks} active of ${totalTasks} total tasks`;
}

function init() {
    setupEventListeners();
    loadTasks();
    renderTasks();
}

init();

console.log(text);