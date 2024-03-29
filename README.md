# Projeto CRUD de Tasks com Importação de CSV 📄🔀

Este é um projeto em JavaScript que implementa um CRUD de tasks (Create, Read, Update, Delete) básico e também permite a importação de tasks a partir de um arquivo CSV, utilizando streams para criar os registros na base de dados.


## Como Usar

1. **Instalação das Dependências:**
   npm install
2. **Execução do Projeto:**
   npm run dev
3. **Criar registros das tasks na base de dados utilizando Streams:**
   node importCSVWithStream.js

## Utilização:

1. **Para criar uma nova task:** POST /tasks { "title": "Task", "description": "Task description" }
2. **Para ler todos os registros:** GET /tasks
3. **Para atualizar um registro:** PUT /tasks/:id { "title": "Task", "description": "Task description" }
4. **Para excluir um registro:** DELETE /tasks/:id
5. **Para marcar uma task como concluída:** PATCH /tasks/:id/complete
