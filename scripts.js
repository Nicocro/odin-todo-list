document.addEventListener("DOMContentLoaded", () => {
  let selectedProjectIndex = null;
  const projects = [];

  const projectList = document.querySelector("#project-list");
  const newProjectForm = document.querySelector("#new-project-form");
  const newProjectName = document.querySelector("#new-project-name");

  const todoList = document.querySelector("#todo-list");
  const addTodoButton = document.querySelector("#add-todo-button");
  const todoDialog = document.querySelector("#todo-dialog");
  const closeButton = document.querySelector("#close-dialog-button");
  const newTodoForm = document.querySelector("#new-todo-form");
  const todoTitle = document.querySelector("#todo-title");
  const todoDescription = document.querySelector("#todo-description");
  const todoDueDate = document.querySelector("#todo-due-date");
  const todoPriority = document.querySelector("#todo-priority");

  newProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const projectName = newProjectName.value.trim();
    if (projectName) {
      addProject(projectName);
      renderProjectList();
      newProjectName.value = "";
    }
  });

  addTodoButton.addEventListener("click", () => {
    if (selectedProjectIndex !== null) {
      todoDialog.showModal();
    } else {
      alert("Please select a project first.");
    }
  });

  closeButton.addEventListener("click", (e) => {
    e.preventDefault();
    todoDialog.close();
  });

  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (selectedProjectIndex !== null) {
      const newTodo = {
        title: todoTitle.value.trim(),
        description: todoDescription.value.trim(),
        dueDate: todoDueDate.value,
        priority: todoPriority.value,
      };
      projects[selectedProjectIndex].todos.push(newTodo);
      todoTitle.value = "";
      todoDescription.value = "";
      todoDueDate.value = "";
      todoPriority.value = "High";
      displayTodos(selectedProjectIndex);
      todoDialog.close();
    } else {
      alert("Please select a project first.");
    }
  });

  function renderProjectList() {
    projectList.innerHTML = "";
    projects.forEach((project, index) => {
      const projectItem = document.createElement("li");
      projectItem.textContent = project.name;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", (e) => {
        e.stopPropagation();
        projects.splice(index, 1);
        renderProjectList();
        if (selectedProjectIndex === index) {
          selectedProjectIndex = null;
          todoList.innerHTML = "";
        }
      });

      projectItem.addEventListener("click", () => {
        selectedProjectIndex = index;
        displayTodos(index);
      });

      projectItem.appendChild(deleteButton);
      projectList.appendChild(projectItem);
    });
  }

  function addProject(projectName) {
    const newProject = {
      name: projectName,
      todos: [],
    };
    projects.push(newProject);
  }

  function displayTodos(projectIndex) {
    todoList.innerHTML = "";
    const project = projects[projectIndex];
    project.todos.forEach((todo) => {
      const todoItem = document.createElement("div");
      todoItem.classList.add("todo-details");
      todoItem.innerHTML = `
                <h3>${todo.title}</h3>
                <p>${todo.description}</p>
                <p>Due Date: ${todo.dueDate}</p>
                <p>Priority: ${todo.priority}</p>
            `;
      todoList.appendChild(todoItem);
    });
  }
});
