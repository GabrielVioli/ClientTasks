const apiUrl = "http://localhost:8080";

async function createUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${apiUrl}/user`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ username, password })
  });

  if (res.ok) {
    alert("Usuário criado com sucesso!");
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    loadUsers();
  } else {
    alert("Erro ao criar usuário");
  }
}

async function loadUsers() {
  const userList = document.getElementById("userList");
  userList.innerHTML = "";

  const res = await fetch(`${apiUrl}/user/1`); // apenas para teste de busca
  if (!res.ok) {
    userList.innerHTML = "<li>Nenhum usuário encontrado</li>";
    return;
  }

  const user = await res.json();
  userList.innerHTML = `<li>ID: ${user.id} - ${user.username}</li>`;
}

async function createTask() {
  const userId = document.getElementById("taskUserId").value;
  const description = document.getElementById("description").value;

  const res = await fetch(`${apiUrl}/task`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ description, user: { id: userId } })
  });

  if (res.ok) {
    alert("Tarefa criada!");
    document.getElementById("description").value = "";
    loadTasks();
  } else {
    alert("Erro ao criar tarefa");
  }
}

async function loadTasks() {
  const userId = document.getElementById("userIdTasks").value;
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const res = await fetch(`${apiUrl}/task/user/${userId}`);
  if (!res.ok) {
    taskList.innerHTML = "<li>Nenhuma tarefa encontrada</li>";
    return;
  }

  const tasks = await res.json();
  tasks.forEach(t => {
    const li = document.createElement("li");
    li.textContent = `#${t.id} - ${t.description}`;
    taskList.appendChild(li);
  });
}
