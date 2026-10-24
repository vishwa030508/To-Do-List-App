
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");
const clearCompleted = document.getElementById("clear-completed");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCount() {
    const remaining = tasks.filter(task => !task.completed).length;
    taskCount.textContent = `${remaining} task(s) remaining`;
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });

        const span = document.createElement("span");
        span.textContent = task.text;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            tasks = tasks.filter(item => item.id !== task.id);
            saveTasks();
            renderTasks();
        });

        li.append(checkbox, span, deleteButton);
        taskList.appendChild(li);
    });

    updateCount();
}

taskForm.addEventListener("submit", event => {
    event.preventDefault();

    const text = taskInput.value.trim();

    if (text === "") return;

    tasks.push({
        id: Date.now(),
        text: text,
        completed: false
    });

    saveTasks();
    renderTasks();
    taskInput.value = "";
    taskInput.focus();
});

clearCompleted.addEventListener("click", () => {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
});

renderTasks();
