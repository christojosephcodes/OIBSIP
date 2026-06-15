// State Management Array
let tasks = [];

// DOM Element Targets
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const pendingList = document.getElementById('pending-list');
const completedList = document.getElementById('completed-list');
const pendingCount = document.getElementById('pending-count');
const completedCount = document.getElementById('completed-count');

// Event Handlers
addTaskBtn.addEventListener('click', createNewTask);
taskInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') createNewTask(); });

function createNewTask() {
    const text = taskInput.value.trim();
    if (!text) return; // Prevent empty tasks

    const timestamp = new Date().toLocaleString();
    const newTask = {
        id: Date.now().toString(),
        text: text,
        completed: false,
        createdTime: timestamp,
        completedTime: null
    };

    tasks.push(newTask);
    taskInput.value = '';
    renderDashboard();
}

function toggleTaskStatus(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            const isCompleting = !task.completed;
            return {
                ...task,
                completed: isCompleting,
                completedTime: isCompleting ? new Date().toLocaleString() : null
            };
        }
        return task;
    });
    renderDashboard();
}

function editTaskText(id) {
    const taskToEdit = tasks.find(task => task.id === id);
    if (!taskToEdit) return;

    const newText = prompt("Update your task text:", taskToEdit.text);
    if (newText === null) return; // Action cancelled
    
    const cleanText = newText.trim();
    if (!cleanText) {
        deleteTask(id);
    } else {
        taskToEdit.text = cleanText;
        renderDashboard();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderDashboard();
}

// Rendering Function
function renderDashboard() {
    // Clear lists completely
    pendingList.innerHTML = '';
    completedList.innerHTML = '';

    let pendingCounter = 0;
    let completedCounter = 0;

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed-tasks' : ''}`;
        
        // Build timestamp template markup string
        let timeMarkup = `<span class="timestamp">Added: ${task.createdTime}</span>`;
        if (task.completed) {
            timeMarkup += ` <span class="timestamp" style="color: #4ade80;">• Completed: ${task.completedTime}</span>`;
        }

        li.innerHTML = `
            <div class="task-main">
                <span class="task-text">${task.text}</span>
                <div class="action-btns">
                    <button class="action-btn complete-btn" onclick="toggleTaskStatus('${task.id}')">
                        ${task.completed ? 'Undo' : 'Complete'}
                    </button>
                    ${!task.completed ? `<button class="action-btn edit-btn" onclick="editTaskText('${task.id}')">Edit</button>` : ''}
                    <button class="action-btn delete-btn" onclick="deleteTask('${task.id}')">Delete</button>
                </div>
            </div>
            ${timeMarkup}
        `;

        if (task.completed) {
            completedList.appendChild(li);
            completedCounter++;
        } else {
            pendingList.appendChild(li);
            pendingCounter++;
        }
    });

    // Update Dashboard Counts
    pendingCount.textContent = pendingCounter;
    completedCount.textContent = completedCounter;
}
