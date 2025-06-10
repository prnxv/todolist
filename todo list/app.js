// Get DOM elements
const todoInput = document.getElementById('todoinput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const taskCount = document.querySelector('.count');
const clearBtn = document.querySelector('.clear button');

// Array to store tasks
let tasks = [];
let taskIdCounter = 1;

// Add task function
function addTask() {
    const taskText = todoInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    
    const task = {
        id: taskIdCounter++,
        text: taskText,
        completed: false
    };
    
    tasks.push(task);
    todoInput.value = '';
    renderTasks();
    updateTaskCount();
}

// Render tasks function
function renderTasks() {
    todoList.innerHTML = '';
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" id="task${task.id}" ${task.completed ? 'checked' : ''}>
            <label for="task${task.id}">${task.text}</label>
            <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
        `;
        
        // Add event listener for checkbox
        const checkbox = li.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => toggleTask(task.id));
        
        todoList.appendChild(li);
    });
}

// Toggle task completion
function toggleTask(id) {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    updateTaskCount();
}

// Delete task function
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
    updateTaskCount();
}

// Update task count
function updateTaskCount() {
    const incompleteTasks = tasks.filter(task => !task.completed).length;
    taskCount.textContent = `${incompleteTasks} task${incompleteTasks !== 1 ? 's' : ''} left`;
}

// Clear completed tasks
function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    renderTasks();
    updateTaskCount();
    alert("Cngratulations! You have cleared all tasks.");
}

// Event listeners
addBtn.addEventListener('click', addTask);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});
clearBtn.addEventListener('click', clearCompleted);

// Initialize
updateTaskCount();