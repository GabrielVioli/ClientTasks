const apiUrl = "https://db4dc7b98ef2.ngrok-free.app"; // seu link ngrok

// Criar usuário
async function createUser() {
    const username = document.getElementById("newUsername").value;
    const password = document.getElementById("newPassword").value;

    if (!username || !password) {
        alert("Preencha todos os campos!");
        return;
    }

    const res = await fetch(`${apiUrl}/user`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, password })
    });

    if (res.ok) {
        alert("Usuário criado com sucesso!");
        document.getElementById("newUsername").value = "";
        document.getElementById("newPassword").value = "";
    } else {
        alert("Erro ao criar usuário");
    }
}

// Login usuário
async function loginUser() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const loginResult = document.getElementById("loginResult");

    if (!username || !password) {
        loginResult.textContent = "Preencha todos os campos!";
        loginResult.style.color = "red";
        return;
    }

    try {
        const res = await fetch(`${apiUrl}/user/username/${username}`);
        if (res.status === 404) {
            loginResult.textContent = "Usuário não encontrado";
            loginResult.style.color = "red";
            return;
        }
        if (!res.ok) throw new Error("Erro ao buscar usuário");

        const user = await res.json();

        if (user.password === password) {
            loginResult.textContent = "Successfully!";
            loginResult.style.color = "green";
        } else {
            loginResult.textContent = "Senha incorreta";
            loginResult.style.color = "red";
        }

    } catch (err) {
        console.error(err);
        loginResult.textContent = "Erro na requisição";
        loginResult.style.color = "r
