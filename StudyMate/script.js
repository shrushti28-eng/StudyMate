
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "All";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById("taskInput");
    const date = document.getElementById("taskDate");
    const priority = document.getElementById("priority");

    if (input.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        id: Date.now(),
        name: input.value.trim(),
        date: date.value,
        priority: priority.value,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    input.value = "";
    date.value = "";

    displayTasks();
}

function toggleTask(id) {
    tasks = tasks.map(task =>
        task.id === id
            ? { ...task, completed: !task.completed }
            : task
    );

    saveTasks();
    displayTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    displayTasks();
}

function filterTasks(filter) {
    currentFilter = filter;
    displayTasks();
}

function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        if (currentFilter === "Pending") {
            return !task.completed;
        }

        if (currentFilter === "Completed") {
            return task.completed;
        }

        return true;
    });

    filteredTasks.forEach(task => {
        const div = document.createElement("div");
        div.className = "task";

        const info = document.createElement("div");
        info.className = "task-info";

        const name = document.createElement("span");
        name.textContent = task.name;
        if (task.completed) {
            name.classList.add("completed");
        }

        const details = document.createElement("p");
        details.textContent =
            `Due: ${task.date || "Not set"} | Priority: ${task.priority}`;

        info.append(name, details);

        const actions = document.createElement("div");

        const completeBtn = document.createElement("button");
        completeBtn.textContent =
            task.completed ? "Undo" : "Complete";
        completeBtn.onclick = () => toggleTask(task.id);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete";
        deleteBtn.onclick = () => deleteTask(task.id);

        actions.append(completeBtn, deleteBtn);
        div.append(info, actions);

        taskList.appendChild(div);
    });

    const completedCount =
        tasks.filter(task => task.completed).length;

    document.getElementById("progress").textContent =
        `Completed: ${completedCount} / ${tasks.length}`;
}

displayTasks();
