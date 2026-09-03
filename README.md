# 📝 Notes API

API REST desenvolvida com **Node.js, TypeScript, Express, SQLite e Knex**, criada para gerenciamento de usuários, notas, tags e links.

A API possui autenticação utilizando **JWT**, armazenamento seguro de senhas com **bcrypt** e proteção das rotas privadas através de middleware de autenticação.

---

## 🚀 Tecnologias

* Node.js
* TypeScript
* Express
* SQLite
* Knex
* JSON Web Token (JWT)
* bcryptjs

---

## 📂 Recursos da API

A API possui os seguintes recursos:

| Recurso     | Descrição                                       |
| ----------- | ----------------------------------------------- |
| `/users`    | Cadastro e atualização de usuários              |
| `/sessions` | Autenticação e geração de JWT                   |
| `/notes`    | Criação, consulta, listagem e exclusão de notas |
| `/tegs`     | Listagem de tags do usuário                     |

---

# 🔐 Autenticação

A autenticação é realizada através de **JWT (JSON Web Token)**.

Primeiramente, o usuário deve realizar login através de:

```http
POST /sessions
```

Enviando seu e-mail e senha:

```json
{
  "email": "usuario@email.com",
  "password": "123456"
}
```

Após a autenticação, a API retorna um token:

```json
{
  "user": {
    "id": 1,
    "name": "Usuário",
    "email": "usuario@email.com"
  },
  "token": "seu_jwt_aqui"
}
```

Nas rotas protegidas, o token deve ser enviado através do header:

```http
Authorization: Bearer SEU_TOKEN
```

O middleware `ensureAuth` verifica o token, recupera o ID do usuário através do `sub` do JWT e disponibiliza esse ID através de:

```ts
req.user.id
```

---

# 👤 Usuários

## Criar usuário

```http
POST /users
```

### Body

```json
{
  "name": "João",
  "email": "joao@email.com",
  "password": "123456"
}
```

### Resposta

**201 Created**

```json
{
  "message": "Usuário criado com sucesso!"
}
```

### Validações

Os campos `name`, `email` e `password` são obrigatórios.

Caso o e-mail já esteja cadastrado:

**400 Bad Request**

```json
{
  "error": "Este e-mail já está em uso"
}
```

A senha é armazenada utilizando hash através do `bcrypt`.

---

## Atualizar usuário

```http
PUT /users
```

🔒 **Rota protegida**

### Header

```http
Authorization: Bearer SEU_TOKEN
```

### Body

Os campos são opcionais:

```json
{
  "name": "Novo Nome",
  "email": "novo@email.com",
  "password": "novaSenha",
  "old_password": "senhaAtual"
}
```

Para alterar a senha, é obrigatório informar `old_password`.

### Resposta

**200 OK**

```json
{
  "message": "Usuário atualizado com sucesso!"
}
```

---

# 🔑 Sessões

## Login

```http
POST /sessions
```

### Body

```json
{
  "email": "usuario@email.com",
  "password": "123456"
}
```

A API:

1. Procura o usuário pelo e-mail.
2. Compara a senha informada com o hash armazenado.
3. Gera um JWT.
4. Retorna o usuário e o token.

### Resposta

**200 OK**

```json
{
  "user": {
    "id": 1,
    "name": "João",
    "email": "joao@email.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

Caso o usuário não exista ou a senha esteja incorreta:

**401 Unauthorized**

```json
{
  "error": "Usuário não encontrado!"
}
```

---

# 📝 Notas

Todas as rotas de notas são protegidas pelo middleware `ensureAuth`.

---

## Criar nota

```http
POST /notes/create
```

🔒 **Rota protegida**

### Header

```http
Authorization: Bearer SEU_TOKEN
```

### Body

```json
{
  "title": "Minha primeira nota",
  "description": "Descrição da minha nota",
  "tags": [
    "javascript",
    "nodejs"
  ],
  "links": [
    "https://nodejs.org",
    "https://expressjs.com"
  ]
}
```

### Resposta

**201 Created**

```json
{
  "message": "Nota criada com sucesso!"
}
```

Durante a criação, a API também associa:

* a nota ao usuário autenticado;
* os links à nota;
* as tags à nota.

---

## Listar notas

```http
GET /notes
```

🔒 **Rota protegida**

É possível pesquisar notas pelo título e pelas tags.

### Buscar pelo título

```http
GET /notes?title=javascript
```

### Buscar por tags

```http
GET /notes?tegs=javascript,nodejs
```

### Buscar por título e tags

```http
GET /notes?title=api&tegs=nodejs,express
```

As notas são ordenadas alfabeticamente pelo título.

### Exemplo de resposta

```json
[
  {
    "id": 1,
    "title": "Minha API",
    "user_id": 1,
    "tags": [
      {
        "id": 1,
        "name": "nodejs",
        "user_id": 1,
        "note_id": 1
      }
    ]
  }
]
```

---

## Visualizar uma nota

```http
GET /notes/show
```

🔒 **Rota protegida**

A API utiliza o ID do usuário autenticado para localizar a nota.

### Exemplo de resposta

```json
{
  "id": 1,
  "title": "Minha API",
  "description": "Descrição da nota",
  "user_id": 1,
  "tegs": [
    {
      "id": 1,
      "name": "nodejs",
      "note_id": 1
    }
  ],
  "links": [
    {
      "id": 1,
      "url": "https://nodejs.org",
      "note_id": 1
    }
  ]
}
```

---

## Excluir nota

```http
DELETE /notes/delete
```

🔒 **Rota protegida**

A nota associada ao usuário autenticado é removida.

### Resposta

**200 OK**

```json
{
  "STATUS": "DELETADO COM SUCESSO"
}
```

---

# 🏷️ Tags

## Listar tags

```http
GET /tegs
```

🔒 **Rota protegida**

Retorna as tags pertencentes ao usuário autenticado.

### Header

```http
Authorization: Bearer SEU_TOKEN
```

### Exemplo de resposta

```json
[
  {
    "id": 1,
    "name": "javascript",
    "user_id": 1,
    "note_id": 1
  },
  {
    "id": 2,
    "name": "nodejs",
    "user_id": 1,
    "note_id": 1
  }
]
```

---

# 🛡️ Middleware de autenticação

As rotas protegidas utilizam o middleware:

```ts
ensureAuth
```

Ele verifica o header:

```http
Authorization: Bearer TOKEN
```

O fluxo de autenticação é:

```text
Cliente
   │
   │ Authorization: Bearer TOKEN
   ▼
ensureAuth
   │
   ├── Token ausente ──────► 401
   │
   ├── Token inválido ─────► 401
   │
   └── Token válido
           │
           ▼
      jwt.verify()
           │
           ▼
       recupera sub
           │
           ▼
      req.user.id
           │
           ▼
      Controller
```

---

# ❌ Tratamento de erros

A aplicação possui uma classe personalizada chamada `AppErros`.

Ela permite definir:

* mensagem do erro;
* código HTTP.

Exemplo:

```ts
throw new AppErros(
  "Usuário não encontrado",
  404
);
```

A aplicação possui um middleware global responsável pelo tratamento desses erros.

### Erro personalizado

```json
{
  "error": "Usuário não encontrado"
}
```

### Erro inesperado

Caso ocorra um erro que não seja um `AppErros`, a API retorna:

**500 Internal Server Error**

```json
{
  "error": "Internal Server Error"
}
```

---

# 🗄️ Banco de dados

A aplicação utiliza **SQLite** como banco de dados.

O acesso ao banco é realizado de duas maneiras:

* `sqlite` → utilizado principalmente no gerenciamento de usuários;
* `Knex` → utilizado nas operações de notas, tags e links.

O Knex está configurado para utilizar:

```text
sqlite3
```

As foreign keys do SQLite são habilitadas através de:

```sql
PRAGMA foreign_keys = ON
```

A aplicação também executa as migrations durante a inicialização.

---

# 🔄 Inicialização

Ao iniciar a aplicação, as migrations são executadas:

```ts
runMigrations();
```

Depois o Express é configurado:

```ts
app.use(express.json());
app.use(router);
```

E o servidor é iniciado na porta:

```text
3000
```

Por padrão:

```text
http://localhost:3000
```

---

# 📌 Rotas disponíveis

| Método | Endpoint        | Autenticação | Descrição         |
| ------ | --------------- | ------------ | ----------------- |
| POST   | `/users`        | ❌            | Criar usuário     |
| PUT    | `/users`        | ✅            | Atualizar usuário |
| POST   | `/sessions`     | ❌            | Realizar login    |
| GET    | `/notes`        | ✅            | Listar notas      |
| GET    | `/notes/show`   | ✅            | Visualizar nota   |
| POST   | `/notes/create` | ✅            | Criar nota        |
| DELETE | `/notes/delete` | ✅            | Excluir nota      |
| GET    | `/tegs`         | ✅            | Listar tags       |

---

# 📁 Estrutura do projeto

Uma estrutura aproximada baseada nos arquivos apresentados:

```text
src/
├── config/
│   └── auth.ts
│
├── controllers/
│   ├── notesContollers.ts
│   ├── SessionsController.ts
│   ├── tegsController.ts
│   └── userControllers.ts
│
├── database/
│   ├── knex/
│   │   └── migrations/
│   │
│   └── sqlite/
│       ├── migrations/
│       └── index.ts
│
├── middlewares/
│   └── essureAuth.ts
│
├── routes/
│   ├── layout.ts
│   ├── router.notes.ts
│   ├── router.tegs.ts
│   ├── router.user.ts
│   └── sessions.routes.ts
│
├── utils/
│   └── appErros.ts
│
└── app.ts
```

---

# ⚙️ Como executar

Clone o projeto:

```bash
git clone SEU_REPOSITORIO
```

Entre na pasta:

```bash
cd nome-do-projeto
```

Instale as dependências:

```bash
npm install
```

Inicie o projeto:

```bash
npm run dev
```

A API estará disponível em:

```text
http://localhost:3000
```

---

# 🧪 Testando a API

Você pode utilizar ferramentas como:

* Insomnia
* Postman
* Thunder Client
* Hoppscotch

Uma sugestão de fluxo para testar a API:

```text
1. Criar usuário
       ↓
2. Fazer login
       ↓
3. Copiar o JWT
       ↓
4. Adicionar Bearer Token
       ↓
5. Criar uma nota
       ↓
6. Listar notas
       ↓
7. Consultar tags
       ↓
8. Visualizar/excluir nota
```

---

# 📚 Conceitos utilizados

Este projeto utiliza diversos conceitos importantes do desenvolvimento de APIs:

* REST API
* Node.js
* TypeScript
* Express
* Middleware
* JWT
* Hash de senhas
* bcrypt
* SQLite
* Knex
* SQL
* Foreign Keys
* Migrations
* HTTP Status Codes
* Tratamento de erros
* Relacionamento entre tabelas
* INNER JOIN
* Filtros utilizando query parameters

---

## 👨‍💻 Autor

Desenvolvido como projeto de estudo e prática de desenvolvimento backend com Node.js e TypeScript.
