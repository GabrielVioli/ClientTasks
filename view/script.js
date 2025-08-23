const apiUrl = "https://db4dc7b98ef2.ngrok-free.app"; // atualize sempre que o ngrok mudar

// Criar usuário
async function createUser() {
    const username = document.getElementById("newUsername").value.trim();
    const password = document.getElementById("newPassword").value.trim();

    const loginResult = document.getElementById("loginResult"); // podemos usar o mesmo p/ mensagens
    loginResult.textContent = "";

    if (!username || !password) {
        loginResult.textContent = "Preencha todos os campos!";
        loginResult.style.color = "red";
        return;
    }

    try {
        console.log("Enviando requisição de criação de usuário...");
        const res = await fetch(`${apiUrl}/user`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ username, password })
        });

        if (res.ok) {
            console.log("Usuário criado com sucesso!");
            loginResult.textContent = "Usuário criado com sucesso!";
            loginResult.style.color = "green";
            document.getElementById("newUsername").value = "";
            document.getElementById("newPassword").value = "";
        } else {
            const text = await res.text();
            console.error("Erro ao criar usuário:", text);
            loginResult.textContent = "Erro: " + text;
            loginResult.style.color = "red";
        }
    } catch (err) {
        console.error("Erro na requisição:", err);
        loginResult.textContent = "Erro na requisição. Veja console.";
        loginResult.style.color = "red";
    }
}

// Login usuário
async function loginUser() {
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const loginResult = document.getElementById("loginResult");

    loginResult.textContent = "";

    if (!username || !password) {
        loginResult.textContent = "Preencha todos os campos!";
        loginResult.style.color = "red";
        return;
    }

    try {
        console.log("Enviando requisição de login...");
        const res = await fetch(`${apiUrl}/user/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ username, password })
        });

        const text = await res.text();

        if (res.ok) {
            console.log("Login bem-sucedido!");
            loginResult.textContent = "Login bem-sucedido!";
            loginResult.style.color = "green";
            window.location.href = "pag2.html";
        } else {
            console.error("Erro no login:", text);
            loginResult.textContent = text;
            loginResult.style.color = "red";
        }
    } catch (err) {
        console.error("Erro na requisição de login:", err);
        loginResult.textContent = "Erro na requisição de login. Veja console.";
        loginResult.style.color = "red";
    }
}
