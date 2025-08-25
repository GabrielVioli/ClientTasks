
Aplicação **Spring Boot** para gerenciamento de **usuários** e **tarefas**, com persistência em banco de dados MySQL.  
Permite criar usuários, fazer login e associar tarefas a cada usuário.

---

## ⚙️ Tecnologias utilizadas

-  **Java 17+**
-  **Spring Boot**
-  **Spring Data JPA**
-  **Jakarta Validation**
-  **MySQL**
-  **Spring Web (REST API)**
-  **CORS Configurado** (para integração com front-end)

---

## 📂 Estrutura do Projeto

```bash
ClientTasks/
├── config/         # Configurações de CORS
├── controllers/    # Endpoints REST (UserController, TaskController)
├── models/         # Entidades (User, Tasks)
├── repositories/   # Interfaces JPA
├── services/       # Regras de negócio
└── DemoApplication.java
```

## Endpoints disponíveis

###  Usuário
- `POST /user` → Criar novo usuário
- `GET /user/{id}` → Buscar usuário por ID
- `GET /user/username/{username}` → Buscar usuário por username
- `POST /user/login` → Login de usuário (username + senha)
- `PUT /user/{id}` → Atualizar senha de usuário
- `DELETE /user/{id}` → Deletar usuário

#### Exemplo JSON (criar usuário)
```json
{
  "username": "joao",
  "password": "123456"
}
Exemplo JSON (login)

{
  "username": "joao",
  "password": "123456"
}
 Tarefas
- POST /task → Criar nova tarefa vinculada a um usuário
- GET /task/{id} → Buscar tarefa por ID
- GET /task/user/{userId} → Listar todas as tarefas de um usuário
- PUT /task/{id} → Atualizar descrição da tarefa
- DELETE /task/{id} → Deletar tarefa

Exemplo JSON (criar tarefa)

{
  "description": "Estudar Spring Boot",
  "user": {
    "id": 1
  }
}
Exemplo JSON (atualizar tarefa)

{
  "description": "Estudar Spring Boot e JPA"
}
```

# Configuração do Banco de Dados
No arquivo application.properties já está configurado para MySQL:
```bash
spring.datasource.url=jdbc:mysql://localhost:XXXX/CLIENT_TASKS?createDatabaseIfNotExist=true
spring.datasource.username=XXXX
spring.datasource.password=XXXX
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

🌍 CORS liberado para:
http://localhost:XXXXX → Testes no IntelliJ
https://gabrielvioli.github.io/ → GitHub Pages
https://*.ngrok-free.app → Integração via túnel ngrok
```

### Como rodar o projeto
- Clone o repositório:
git clone https://github.com/seu-usuario/ClientTasks.git
cd ClientTasks
Configure o MySQL rodando na porta XXXX.

Execute o projeto:

- ./mvnw spring-boot:run

- A API estará disponível em:
http://localhost:8080



---
