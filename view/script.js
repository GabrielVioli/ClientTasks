const apiUrl = "https://db4dc7b98ef2.ngrok-free.app"; // atualize sempre que o ngrok mudar
const loginResult = document.getElementById("loginResult");

// Função para criar usuário
async function createUser() {
    const username = document.getElementById("newUsername").value.trim();
    const password = document.getElementById("newPassword").value.trim();

    loginResult.textContent = "";

    if (!username || !password) {
        loginResult.textContent = "Preencha todos os campos!";
        loginResult.style.color = "red";
        return;
    }

    try {
        console.log("Criando usuário...");
        const res = await fetch(`${apiUrl}/user`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        if (res.ok) {
            loginResult.textContent = "Usuário criado com sucesso!";
            loginResult.style.color = "green";
            document.getElementById("newUsername").value = "";
            document.getElementById("newPassword").value = "";
            console.log("Usuário criado!");
        } else {
            const text = await res.text();
            loginResult.textContent = "Erro: " + text;
            loginResult.style.color = "red";
            console.error("Erro ao criar usuário:", text);
        }
    } catch (err) {
        loginResult.textContent = "Erro na requisição. Veja console.";
        loginResult.style.color = "red";
        console.error("Erro na requisição:", err);
    }
}

// Função para login
async function loginUser() {
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    loginResult.textContent = "";

    if (!username || !password) {
        loginResult.textContent = "Preencha todos os campos!";
        loginResult.style.color = "red";
        return;
    }

    try {
        console.log("Tentando login...");
        const res = await fetch(`${apiUrl}/user/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const text = await res.text();

        if (res.ok) {
            loginResult.textContent = "Login bem-sucedido!";
            loginResult.style.color = "green";
            console.log("Login bem-sucedido!");
            window.location.href = "pag2.html"; // redireciona
        } else {
            loginResult.textContent = text;
            loginResult.style.color = "red";
            console.error("Erro no login:", text);
        }
    } catch (err) {
        loginResult.textContent = "Erro na requisição de login. Veja console.";
        loginResult.style.color = "red";
        console.error("Erro na requisição de login:", err);
    }
}

// Event listeners para os botões
document.getElementById("btnCreateUser").addEventListener("click", createUser);
document.getElementById("btnLoginUser").addEventListener("click", loginUser);
