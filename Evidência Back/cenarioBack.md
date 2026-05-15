# 📡 Test Documentation - Restful-Booker (API)

Este documento detalha a estratégia, os cenários e os resultados dos testes de API realizados na plataforma Restful-Booker.

---

## 📋 1. Plano de Testes
**Objetivo:** Validar a confiabilidade das operações de CRUD (Create, Read, Update, Delete) de reservas, a segurança da autenticação e a resiliência da API contra envios de dados incompletos.
**Ferramentas:** Insominia (Testes Exploratórios).
**URL Base:** `https://restful-booker.herokuapp.com`

---

## 🛣️ 2. Cenários de Teste (API)

Abaixo estão os cenários mapeados.

### 🔐 2.1 Fluxo de Autenticação
*   **CT01 - Geração de Token de Acesso:**
    *   **Dado** que envio credenciais válidas (`admin` / `password123`) para o endpoint `/auth`
    *   **Então** a API deve retornar o status `200 OK`
    *   **E** o corpo da resposta deve conter um `token` alfanumérico.

### 📅 2.2 Gestão de Reservas (CRUD)
*   **CT02 - Criar uma nova reserva (POST):**
    *   **Dado** que envio um payload JSON completo e válido para `/booking`
    *   **Então** a API deve retornar status `200 OK`
    *   **E** deve retornar os dados da reserva criados junto com um `bookingid`.
*   **CT03 - Atualizar uma reserva existente (PUT):**
    *   **Dado** que possuo um `bookingid` válido e um `token` de autenticação no Header (Cookie)
    *   **Quando** envio um payload com novos dados para `/booking/:id`
    *   **Então** a API retorna status `200 OK` refletindo as alterações.
*   **CT04 - Deletar uma reserva (DELETE):**
    *   **Dado** que envio uma requisição DELETE para `/booking/:id` com o token de autorização
    *   **Então** a API deve retornar `201 Created` (comportamento específico desta documentação) 
    *   **E** a reserva não deve mais ser encontrada em buscas subsequentes.

### ⚠️ 2.3 Filtros e Validações de Erro
*   **CT05 - Validação de campo obrigatório ausente:**
    *   **Dado** que tento criar uma reserva (POST) sem enviar o campo obrigatório `firstname`
    *   **Então** a API deve bloquear a criação e retornar status `500 Internal Server Error`.
*   **CT06 - Acesso negado sem Token (Segurança):**
    *   **Dado** que tento deletar uma reserva (DELETE) sem enviar o Header de Cookie
    *   **Então** a API deve retornar `403 Forbidden`.

---

## 📊 3. Execução e Resultados

A automação foi implementada na aba "Tests" do Postman. Os testes validam Status Code, Tempo de Resposta, Estrutura do Payload e Fluxo de Variáveis.

| ID | Cenário | Método | Endpoint | Status HTTP | Resultado Automático |
|:---|:---|:---:|:---|:---:|:---:|
| CT01 | Gerar Token | POST | `/auth` | 200 | ✅ Pass |
| CT02 | Criar Reserva | POST | `/booking` | 200 | ✅ Pass |
| CT03 | Atualizar Reserva | PUT | `/booking/:id` | 200 | ✅ Pass |
| CT04 | Deletar Reserva | DELETE | `/booking/:id` | 201 | ✅ Pass |
| CT05 | Falta de campo | POST | `/booking` | 500 | ✅ Pass |
| CT06 | Excluir sem Token| DELETE | `/booking/:id` | 403 | ✅ Pass |

---

## 🐞 4. Análise de Bugs, Riscos e Melhorias

### 🔍 Bugs e Inconsistências
1.  **Código HTTP Inadequado na Deleção:** Ao deletar uma reserva com sucesso, a API retorna `201 Created`. O padrão RESTful correto deveria ser `200 OK` ou `204 No Content`.
2.  **Erro de Validação Genérico:** Ao enviar um payload incompleto no POST, a API retorna `500 Internal Server Error`. O correto seria um `400 Bad Request` detalhando qual campo estava faltando.

### ⚠️ Análise de Riscos
*   **Risco de Segurança (Autenticação):** A API utiliza o token de autenticação passado via Cookie em vez de um header padrão `Authorization: Bearer`. Isso pode facilitar ataques de CSRF se não for bem implementado no front-end.

### 💡 Sugestões de Melhorias
*   Implementação de paginação no endpoint `GET /booking` para evitar sobrecarga do servidor ao listar milhares de reservas.
*   Melhoria no tratamento de erros (Error Handling) para retornar mensagens em JSON padronizadas no lugar de strings em texto puro (ex: "Method Not Allowed").

---

## ⚙️ 5. Como executar a automação

1. **Importação:** Abra o **Insomnia** e importe o arquivo `collection.json` anexado a este repositório (Vá em *Create* > *Import from File* ou simplesmente arraste o arquivo para a interface).
2. **Ambiente (Environment):** O arquivo exportado já contém as Variáveis de Ambiente embutidas. Certifique-se apenas de que o ambiente importado (onde consta a `base_url`) está selecionado no canto superior esquerdo da tela.
3. **Execução:** Envie as requisições na ordem estruturada nas pastas. Os scripts configurados na aba *Scripts (After-response)* farão a extração automática do `token` e do `bookingid`, passando-os para as próximas requisições. As asserções e validações de teste ocorrerão automaticamente a cada envio.