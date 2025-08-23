const apiUrl = "https://db4dc7b98ef2.ngrok-free.app"; // seu link ngrok

// Criar usuário
async function createUser() {
    const username = document.getElementById("newUsername").value;
    const password = document.getElementById("newPassword").value;

    if (!username || !password) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
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
            const text = await res.text();
            alert("Erro ao criar usuário: " + text);
        }
    } catch (err) {
        console.error(err);
        alert("Erro na requisição");
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
        const res = await fetch(`${apiUrl}/user/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ username, password })
        });

        const text = await res.text();

        if (res.ok) {
            window.location.href = "pag2.html";
        } else {
            loginResult.textContent = text;
            loginResult.style.color = "red";
        }
    } catch (err) {
        console.error(err);
        loginResult.textContent = "Erro na requisição";
        loginResult.style.color = "red";
    }
}


    try {
        const res = await fetch(`${apiUrl}/user/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ username, password })
        });

        const text = await res.text();

        if (res.ok) {
            loginResult.textContent = text;
            loginResult.style.color = "green";
        } else {
            loginResult.textContent = text;
            loginResult.style.color = "red";
        }
    } catch (err) {
        console.error(err);
        loginResult.textContent = "Erro na requisição";
        loginResult.style.color = "red";
    }
}
